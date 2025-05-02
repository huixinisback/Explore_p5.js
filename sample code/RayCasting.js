let player, targets;

function setup() {
	new Canvas(500, 200);
	
	targets = new Group();
	for (let i = 0; i < 80; i++) {
		new targets.Sprite(random(500), random(200), 20, 20);
	}
	player = new Sprite(250, 100, 30);
}

function draw() {
	background(0);
	targets.color = color(120);

	let sprites = world.rayCastAll(player, mouse);

	for (let s of sprites) s.color = 'orange';

	stroke('orange');
	line(player.x, player.y, mouse.x, mouse.y);
	noStroke();
}