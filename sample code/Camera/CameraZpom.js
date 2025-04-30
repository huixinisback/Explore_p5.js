/*
Camera Zoom
zoom changes the scale that sprites and other elements in the world are drawn at. Increasing the zoom will make sprites appear larger, and decreasing the zoom will make sprites appear smaller.

zoomTo(target, speed) is an async function that can be used to smoothly zoom the camera in and out. It takes an optional second parameter, the amount it will zoom per frame.
*/

function setup() {
	new Canvas(500, 100);
	new Sprite();

	camera.zoom = 0.5;
}

function drawFrame() {
	clear();

	if (mouse.presses()) camera.zoomTo(1);
	else if (mouse.released()) camera.zoomTo(0.5);
}