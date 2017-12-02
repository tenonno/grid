import * as React from 'react';
import * as ReactDOM from 'react-dom';


const PIXI = require('pixi.js');

var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });





let container = new PIXI.Container();


app.stage.addChild(container);



for (let x = 0; x < 3; ++x) {

	for (let y = 0; y <3; ++y) {

		var graphics = new PIXI.Graphics();
		container.addChild(graphics);

		var _x = x * 100;
		var _y = y * 100;

		const margin = 4;

		// draw a shape
		// graphics.lineStyle(22, 0x0000FF, 1);
		graphics.beginFill(0xFF700B, 1);
		graphics.drawRect(margin, margin, 100 - margin * 2, 100 - margin * 2);
		// Opt-in to interactivity
		graphics.interactive = true;

		// Shows hand cursor
		graphics.buttonMode = true;

		// Pointers normalize touch and mouse

		graphics.x = _x;
		graphics.y = _y;


		// Pointers normalize touch and mouse
		graphics.on('pointerdown', function () {

			console.log(x, y);

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

	window.setTimeout(() => {

		document.querySelector('#canvas-container').appendChild(app.view);

		console.log(document.querySelector('#canvas-container'))
		appended = true;
	}, 500);

}

let c = 0;

const ticker = new PIXI.ticker.Ticker();
ticker.stop();

ticker.add((deltaTime: number) => {

	++c;
	
	container.scale.x = (Math.sin(c * 0.02) + 1) * 2.0;
	container.scale.y = (Math.sin(c * 0.02) + 1) * 2.0;

});
ticker.start();

const Canvas: React.SFC<any> = (props: any) => {

	append();

	return (
		<div>

			<div id="canvas-container" style={{ margin: '20px' }}></div>

		</div>
	);
};

export default Canvas;
