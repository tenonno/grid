import * as React from 'react';
import * as ReactDOM from 'react-dom';


const PIXI = require('pixi.js');


const app = new PIXI.Application(800, 600);


// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const GRID_SIZE = 100;
const TILE_SIZE = 100;
const GRID_SCALE = 0.3;


let container = new PIXI.Container();


app.stage.addChild(container);


let graphics_cache: any = {};

let tile_x = 0;
let tile_y = 0;


function initCanvas(tileX: number, tileY: number, scale:number, layers: ILayer[], setTile: any, props: any) {

	// サイズが変わっていたら
	if (tile_x !== tileX || tile_y !== tileY) {
		tile_x = tileX;
		tile_y = tileY;

		console.warn('canvas のサイズを変更します');


		// 既にあるタイルを削除する
		container.removeChildren();
	
	}

	app.renderer.resize(tileX * TILE_SIZE, tileY * TILE_SIZE);

	app.view.style.width = app.renderer.width * scale * 0.01 * GRID_SCALE + 'px';
	app.view.style.height = app.renderer.height * scale * 0.01 * GRID_SCALE + 'px';


	for (let x = 0; x < tileX; ++x) {
		for (let y = 0; y < tileY; ++y) {


			if (!graphics_cache[`${x}:${y}`]) {

				console.warn('PIXI の Graphics を再生成します');


				var graphics2 = new PIXI.Graphics();
				container.addChild(graphics2);

				graphics_cache[`${x}:${y}`] = graphics2;

			}

			const graphics = graphics_cache[`${x}:${y}`];


			var _x = x * TILE_SIZE;
			var _y = y * TILE_SIZE;

			const margin = 4;

			let color = 0x000000;

			for (const layer of layers) {

				// 非表示レイヤーなら無視
				if (!layer.visibility) continue;

				if (layer.tiles[y][x]) {

					color = layer.color;

					break;
				}

			}


			// draw a shape
			// graphics.lineStyle(22, 0x0000FF, 1);
			graphics.beginFill(color, 1);
			graphics.drawRect(margin, margin, TILE_SIZE - margin * 2, TILE_SIZE - margin * 2);
			// Opt-in to interactivity
			graphics.interactive = true;

			// Shows hand cursor
			graphics.buttonMode = true;

			// Pointers normalize touch and mouse

			graphics.x = _x;
			graphics.y = _y;


			function $setTile(value: boolean) {

				if (props.layers[props.currentLayerIndex].tiles[y][x] === value) return;

				setTile({x, y, value});
			}


			// Pointers normalize touch and mouse
			graphics.on('pointerdown', function () {

				/*
				this.beginFill(0x000000, 1);
				this.drawRect(margin, margin, 100 - margin * 2, 100 - margin * 2);
				*/
				$setTile(true);

			});


			graphics.on('pointerover', function ({ data }: any) {

				// マウスの左ボタンを押している
				if (data.originalEvent.buttons === 1) {


					/*
					this.beginFill(0x000000, 1);
					this.drawRect(margin, margin, 100 - margin * 2, 100 - margin * 2);
					*/
					$setTile(true);

				}


			});

			["click", "mousedown", "", "mouseout", "mouseover", "mouseup", "mouseupoutside", "pointercancel", "pointerdown", "", "pointerout", "pointerover", "pointertap", "pointerup", "pointerupoutside", "rightclick", "rightdown", "rightup", "rightupoutside", "tap", "touchcancel", "touchend", "touchendoutside", "touchmove", "touchstart"].forEach((key) => {

				if (1 == 1) return;
				graphics.on(key, function () {
					console.warn(key, x, y)
				});

			});


			// Alternatively, use the mouse & touch events:
			// sprite.on('click', onClick); // mouse-only
			// sprite.on('tap', onClick); // touch-only


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

{				[props.layers].map((layer) => layer.tiles)}
			
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

