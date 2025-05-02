function setup() {
	new Canvas(200, 200);

	bricks = new Group();
	bricks.w = 20;
	bricks.h = 10;
	bricks.tile = '=';

	tilesGroup = new Tiles(
		[
			'======',
			'======',
			'==....',
			'==....',
			'=====.',
			'======',
			'....==',
			'....==',
			'======',
			'=====.'
		],
		36, 40,
		bricks.w + 4, bricks.h + 4
	);
}

let bricks, tilesGroup;

function draw() {
	clear();

	for (let brick of bricks) {
		if (brick.mouse.hovers()) {
			brick.color = '#AA4A44';
		}
	}
}