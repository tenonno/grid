import * as React from 'react';
import * as ReactDOM from 'react-dom';


const PIXI = require('pixi.js');


const GRID_SIZE = 100;

var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });



let $props: any = null;


let container = new PIXI.Container();


app.stage.addChild(container);


const TILE_SIZE = 100;


for (let x = 0; x < 30; ++x) {
	for (let y = 0; y < 30; ++y) {

		var graphics = new PIXI.Graphics();
		container.addChild(graphics);

		var _x = x * TILE_SIZE;
		var _y = y * TILE_SIZE;

		const margin = 4;

		// draw a shape
		// graphics.lineStyle(22, 0x0000FF, 1);
		graphics.beginFill(0xFF700B, 1);
		graphics.drawRect(margin, margin, TILE_SIZE - margin * 2, TILE_SIZE - margin * 2);
		// Opt-in to interactivity
		graphics.interactive = true;

		// Shows hand cursor
		graphics.buttonMode = true;

		// Pointers normalize touch and mouse

		graphics.x = _x;
		graphics.y = _y;


		// Pointers normalize touch and mouse
		graphics.on('pointerdown', function () {

			this.beginFill(0x000000, 1);
			this.drawRect(margin, margin, 100 - margin * 2, 100 - margin * 2);

		});

		// Alternatively, use the mouse & touch events:
		// sprite.on('click', onClick); // mouse-only
		// sprite.on('tap', onClick); // touch-only


	}

}



// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;




let appended = false;

function append() {

	if (appended) return;


	window.addEventListener('DOMContentLoaded', () => {

		document.querySelector('#canvas-container').appendChild(app.view);

		console.log(document.querySelector('#canvas-container'))
		appended = true;

	});

}


const ticker = new PIXI.ticker.Ticker();
ticker.stop();

ticker.add((deltaTime: number) => {

	app.renderer.resize(30 * TILE_SIZE, 30 * TILE_SIZE);

	app.view.style.width = app.renderer.width * $props.editor.scale * 0.01 + 'px';
	app.view.style.height = app.renderer.height * $props.editor.scale * 0.01 + 'px';

});
app.view.style.margin = 100 + 'px';


ticker.start();

const Canvas: React.SFC<any> = (props: any) => {

	$props = props;

	append();

	return (

		<div style={{ minWidth: '100%', minHeight: '100%', background: '#333', overflow: 'scroll' }}>

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

	editor: state.editor,

	canvas: state.canvas as ISize,
}), (dispatch) => ({
	actions: bindActionCreators(actions, dispatch)
}))(Canvas);

