let s0, s1, j;

function setup() {
  new Canvas(500, 200);
  world.gravity.y = 10;

  // Pivot point (static)
  s0 = new Sprite(250, 100, 30, 30, 'static');

  // Beam (dynamic)
  s1 = new Sprite(250, 100, 400, 20, 'dynamic');

  // Revolute (hinge) joint between the two
  j = new HingeJoint(s0, s1);
}

function draw() {
  clear();

  // Create falling blocks on click
  if (mouse.presses()) {
    let box = new Sprite(mouse.x, mouse.y, 6, 6);
    box.color = 'gray';
  }
}
