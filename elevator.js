let player, elevator, floor;
let gravity = 10;

function setup() {
  new Canvas(400, 400);
  world.gravity.y = gravity;

  // Floor
  floor = new Sprite(200, 390, 400, 20, 'static');
  floor.color = 'gray';

  // Elevator
  elevator = new Sprite(200, 300, 100, 20, 'dynamic');
  elevator.color = 'orange';

  // Player
  player = new Sprite(200, 200, 30, 30, 'dynamic');
  player.color = 'blue';

}

function draw() {
  clear();

  // Elevator physics control
  if (player.overlapping(elevator) && player.vel.y >= 0) {
    elevator.vel.y = -2; // Move up slowly
    player.y = elevator.y - 26;
    player.vel.y = -2;
  } 
  // Elevator naturally falls due to gravity when no player
  else if (elevator.y < 300) {
    // only let it fall back if above starting point
    elevator.vel.y = 2;
  } 
  else {
    elevator.vel.y = 0; // stop moving when at bottom
  }

  // Player controls
  if (kb.pressing('left')) {
    player.vel.x = -3;
  } else if (kb.pressing('right')) {
    player.vel.x = 3;
  } else {
    player.vel.x = 0;
  }

  // Jumping
  if (kb.presses('up') && player.vel.y === 0) {
    player.vel.y = -7;
  }
}
