let ani;

function setup() {
	new Canvas(500, 160);

	ani = loadAni('assets/asterisk_explode01.webp', 11);
}

function update() {
	clear();

	if (kb.presses('space')) {
		if (ani.playing) ani.pause();
		else ani.play();
	}

	if (kb.presses('p')) ani.play(0);
	if (kb.presses('ArrowDown')) ani.frameDelay--;
	if (kb.presses('ArrowUp')) ani.frameDelay++;
	if (kb.presses('r')) ani.rewind();
	if (kb.presses('l')) ani.loop();
	if (kb.presses('n')) ani.noLoop();
	if (kb.presses('ArrowLeft')) ani.previousFrame();
	if (kb.presses('ArrowRight')) ani.nextFrame();
	if (kb.presses('5')) ani.frame = 5;
	if (kb.pressing('x')) ani.scale.x = -1;
	if (kb.pressing('y')) ani.scale.y = -1;
	if (kb.pressing('1')) ani.scale = 1;
	if (kb.pressing('2')) ani.scale = 2;

	animation(ani, 250, 80);
}