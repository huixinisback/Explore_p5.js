/*
Camera On & Off
By default, allSprites.draw() is called at the end of the q5.js draw loop, where the camera is automatically turned on. However, if you want to control when sprites and groups are drawn, you can draw them separately.

The player and environment of your game should be drawn after the camera is turned on with camera.on().

UI or HUD sprites, represented by orange squares in this examples, should be drawn after the camera is turned off with camera.off().

mouse.x stores the x position of the mouse in relation to the world, which can be larger than the canvas. mouse.canvasPos.x stores the x position of the mouse in relation to the canvas.

*/

let player, ui;

function setup() {
	new Canvas(500, 240);
	player = new Sprite();
	player.d = 40;
	player.color = 'magenta';

	ui = new Group();
	for (let i = 0; i < 9; i++) {
		new ui.Sprite(100 + i * 40, 210, 35, 35, 'n');
	}
}

function update() {
	player.moveTowards(mouse, 0.02);
}

function drawFrame() {
	background(0);

	camera.on();

	for (let i = 0; i < 10; i++) {
		fill(i * 20, 200, 200); // blue to gray
		rect(i * 25, i * 100, 400, 40);
	}
	player.draw();
	camera.x = player.x;
	camera.y = player.y;

	camera.off();

	ui.color = 'orange';
	for (let i = 0; i < 9; i++) {
		if (kb[i + 1]) ui[i].color = 'red';
	}
	ui.draw();
}