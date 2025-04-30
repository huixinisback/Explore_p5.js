/*
A SliderJoint constrains the motion of two sprites to sliding along a common axis, without rotation.

The joint's range determines how far apart the connected sprites can be from each other. Changing the joint's angle changes the direction the sprites can slide in.

By default the joint's motor is enabled with a speed of 0, so maxPower determines how much the joint can resist sliding.

Try dropping boxes on the scale by clicking with your mouse. How many boxes can you stack on the scale before it reaches its limit? Try changing its angle too.
*/

let floor, scale, j;

function setup() {
	new Canvas(120, 432);
	world.gravity.y = 10;

	floor = new Sprite(60, 380, 500, 20,STA)
	scale = new Sprite(60, 200, 90, 10);

	j = new SliderJoint(floor, scale);
	j.range = 200;
	j.angle = 90;
}

function update() {
	clear();

	if (mouse.presses()) {
		new Sprite(mouse.x, mouse.y, 20, 20);
	}
	if (kb.pressing(' ')) j.speed = -500;
	else j.speed = 0;
}