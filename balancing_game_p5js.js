let boxes = [];
let beam;
let pivotX = 250;
let pivotY = 200;
let beamLength = 400;
let gravity = 0.5;

function setup() {
  createCanvas(500, 400);
  rectMode(CENTER);

  // Beam properties
  beam = {
    angle: 0,        // initial rotation
    angularVelocity: 0,
    angularAcceleration: 0,
    momentOfInertia: 50000  // resistance to rotation
  };
}

function draw() {
  background(30);

  // Update physics
  applyTorques();

  // Update beam rotation
  beam.angularVelocity += beam.angularAcceleration;
  beam.angle += beam.angularVelocity;
  beam.angularVelocity *= 0.99; // damping (friction/air resistance)

  // Draw pivot
  fill('white');
  ellipse(pivotX, pivotY, 10, 10);

  // Draw beam
  push();
  translate(pivotX, pivotY);
  rotate(beam.angle);
  fill('orange');
  rect(0, 0, beamLength, 20);
  pop();

  // Update and show boxes
  for (let box of boxes) {
    box.update();
    box.show();
  }
}

// Click to drop a box
function mousePressed() {
  boxes.push(new Box(mouseX, mouseY));
}

class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.mass = 1; // kg
    this.vy = 0;
    this.stuck = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dropHeight = y; // starting height
  }

  update() {
    if (!this.stuck) {
      this.vy += gravity;
      this.y += this.vy;

      let beamY = getBeamYAtX(this.x);
      if (abs(this.y - beamY) < 5) {
        this.stuck = true;

        // save position relative to pivot for rotating later
        let dx = this.x - pivotX;
        let dy = this.y - pivotY;
        this.offsetX = cos(-beam.angle) * dx - sin(-beam.angle) * dy;
        this.offsetY = sin(-beam.angle) * dx + cos(-beam.angle) * dy;

        // capture impact energy (optional)
        this.impactEnergy = this.mass * gravity * (this.dropHeight - this.y);
      }
    } else {
      // follow beam rotation
      let rotatedX = cos(beam.angle) * this.offsetX - sin(beam.angle) * this.offsetY;
      let rotatedY = sin(beam.angle) * this.offsetX + cos(beam.angle) * this.offsetY;
      this.x = pivotX + rotatedX;
      this.y = pivotY + rotatedY;
    }
  }

  show() {
    fill('gray');
    rect(this.x, this.y, this.size, this.size);
  }
}

// Calculates beam Y at a given X position
function getBeamYAtX(x) {
  let dx = x - pivotX;
  let dy = tan(beam.angle) * dx;
  return pivotY + dy;
}

// Apply torques from all stuck boxes
function applyTorques() {
  let totalTorque = 0;

  for (let box of boxes) {
    if (box.stuck) {
      // Distance from pivot (horizontal)
      let dx = (box.x - pivotX);
      let force = box.mass * gravity;
      let torque = force * dx;

      totalTorque += torque;
    }
  }

  // Angular acceleration = torque / moment of inertia
  beam.angularAcceleration = totalTorque / beam.momentOfInertia;
}
