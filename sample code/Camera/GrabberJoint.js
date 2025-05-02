let j;

function setup() {
	new Canvas(500, 400);
	world.gravity.y = 10;
	new Sprite(250, 390, 400, 10, STA);
}

function draw() {
	background(200);

	if (frameCount % 10 == 0) {
		new Sprite(random(canvas.w), 0, 30, 30);
	}

	if (mouse.presses()) {
		let s = world.getSpriteAt(mouse);
		if (s) {
			j = new GrabberJoint(s);
			j.maxForce = 1000;
		}
	}

	if (mouse.pressing() && j) j.target = mouse;

	if (mouse.released() && j) j.remove();
}