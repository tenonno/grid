import * as React from 'react';
import * as ReactDOM from 'react-dom';


const PIXI = require('pixi.js');


const app = new PIXI.Application(800, 600);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const GRID_SIZE = 100;
const TILE_SIZE = 100;
const GRID_SCALE = 0.3;


let container = new PIXI.Container();


app.stage.addChild(container);


let graphics_cache: any = {};

let tile_x = 0;
let tile_y = 0;


var c = document.createElement('canvas');
c.width = 1;
c.height = 1;
const colorContext = c.getContext('2d');

function getColor(color: string): number {

	colorContext.fillStyle = color;
	colorContext.fillRect(0, 0, 1, 1);

	const data = colorContext.getImageData(0, 0, 1, 1);

	const a = [...data.data].slice(0, 3).map((value) => (value.toString(16) as any).padStart(2, 0)).join('');

	return parseInt(a, 16);
}


function initCanvas(tileX: number, tileY: number, scale: number, layers: ILayer[], setTile: any, props: any) {

	// サイズが変わっていたら
	if (tile_x !== tileX || tile_y !== tileY) {
		tile_x = tileX;
		tile_y = tileY;

		console.warn('canvas のサイズを変更します');

		app.renderer.resize(tileX * TILE_SIZE, tileY * TILE_SIZE);

		app.view.style.width = app.renderer.width * scale * 0.01 * GRID_SCALE + 'px';
		app.view.style.height = app.renderer.height * scale * 0.01 * GRID_SCALE + 'px';

		// 既にあるタイルを削除する
		container.removeChildren();

	}




	for (let x = 0; x < tileX; ++x) {
		for (let y = 0; y < tileY; ++y) {

			const currentValue = props.layers[props.currentLayerIndex].tiles[y][x];


			const $setTile = (value: boolean): any => {
				// console.log(currentValue);
				// if (currentValue === value) return;
				
				setTile({ x, y, value });
			}
				
			if (!graphics_cache[`${x}:${y}`]) {

				console.warn('PIXI の Graphics を再生成します');

				var graphics2 = new PIXI.Graphics();
				container.addChild(graphics2);

				graphics_cache[`${x}:${y}`] = graphics2;


				graphics2.on('pointerdown', () => {
					$setTile(true);
				});

				graphics2.on('pointerover', ({ data }: any) => {
					// マウスの左ボタンを押している
					if (data.originalEvent.buttons === 1) {
						$setTile(true);
					}
				});

				graphics2.interactive = true;
				graphics2.buttonMode = true;

			}

			const graphics = graphics_cache[`${x}:${y}`];


			var _x = x * TILE_SIZE;
			var _y = y * TILE_SIZE;

			const margin = 4;

			let color: string = null;

			for (const layer of props.layers) {

				// 非表示レイヤーなら無視
				if (!layer.visibility) continue;

				if (layer.tiles[y][x]) {

					color = layer.color;

					break;
				}

			}

			if (color === null) {
				graphics.beginFill(0, 1);
				// graphics.
			}
			else {
				graphics.beginFill(getColor(color), 1);
			}	

			graphics.drawRect(margin, margin, TILE_SIZE - margin * 2, TILE_SIZE - margin * 2);

			graphics.x = _x;
			graphics.y = _y;

		}
	}
}




let appended = false;

let mounted = false;

function append() {

	// 表示済みなのに存在しないなら
	if (mounted && !document.querySelector('#canvas-container>canvas')) {

	}
	else if (appended) return;

	window.addEventListener('DOMContentLoaded', () => {

		document.querySelector('#canvas-container').appendChild(app.view);

		console.log(document.querySelector('#canvas-container'))

		mounted = true;

	});

	appended = true;

}

/*
const ticker = new PIXI.ticker.Ticker();
ticker.stop();
ticker.add((deltaTime: number) => {
});
*/

app.view.style.margin = 100 + 'px';


const Canvas: React.SFC<any> = (props: any) => {


	console.warn('Canvas がレンダリングされました');

	append();

	initCanvas(props.grid.width, props.grid.height, props.editor.scale, props.layers, props.actions.setTile, props);

	return (


		<div style={{ minWidth: '100%', minHeight: '100%', background: '#333', overflow: 'scroll' }}>

			<div style={{ display: 'none' }}>

				{[props.layers].map((layer) => layer.tiles)}

			</div>


			<div id="canvas-container" style={{
				display: 'inline-flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				minWidth: '100%', minHeight: '100%'
			}}>



			</div>
		</div>
	);
};


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from 'actions/actionCreators';
import { ILayer, ISize } from 'types/state';

export default connect((state) => ({

	layers: state.layers,

	currentLayerIndex: state.currentLayerIndex,

	editor: state.editor,

	grid: state.grid

}), (dispatch) => ({
	actions: bindActionCreators(actions, dispatch)
}))(Canvas);

