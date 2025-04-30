/*
The camera is center positioned and located in the middle of the canvas by default.

The camera can be moved by changing its x and y values or by using the camera.moveTo function.

If you want the camera to follow a sprite, put camera movement code in the drawFrame function, which runs after the physics simulation.

In this example the camera follows the player's x axis movement. 

*/

let player, floor;

function setup() {
	new Canvas(500, 240);
	world.gravity.y = 10;
	player = new Sprite(50, 0);
	floor = new Sprite(250, 200, 500, 40, STATIC);
}

function update() {
	if (mouse.presses()) {
		player.vel.y = -4;
		player.vel.x = 3;
	}
}

function drawFrame() {
	clear();
	camera.x = player.x;
}