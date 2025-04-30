let playerMagnet, worldMagnet;
let playerPolarity = 'north'; // default

function setup() {
  new Canvas(800, 400);
  world.gravity.y = 0; // no gravity for magnets

  // Player Magnet
  playerMagnet = new Sprite(200, 200, 80, 20, 'dynamic');
  playerMagnet.color = 'blue';
  playerMagnet.mass = 3;
  playerMagnet.damping = 0.8;

  // World Magnet
  worldMagnet = new Sprite(300, 200, 80, 20, 'dynamic');
  worldMagnet.color = 'red';
  worldMagnet.mass = 3;
  worldMagnet.damping = 0.8;
 
}

function draw() {
  clear();

  //
  textSize(18);
  fill(0);
  textAlign(CENTER, TOP);
  text("MAGNETS ", 250, 30);
  text("Keys: ← = South | → = North ", 250, 50);
  
  // Control Player Polarity
  if (kb.presses('left')) {
    playerPolarity = 'north';
    playerMagnet.color = 'blue'; // north = blue
  }
  if (kb.presses('right')) {
    playerPolarity = 'south';
    playerMagnet.color = 'red'; // south = red
  }

  // Calculate force between magnets
  let dx = worldMagnet.x - playerMagnet.x;
  let dy = worldMagnet.y - playerMagnet.y;
  let distance = dist(playerMagnet.x, playerMagnet.y, worldMagnet.x, worldMagnet.y);
  let forceStrength = constrain(1000 / (distance * distance), 0, 5); // Inverse square law (weaken with distance)

  // Attraction or Repulsion
  if (playerPolarity === 'north') {
    // North facing: Repel if both are same (north), attract if different
    // Assume worldMagnet is south facing
    worldMagnet.applyForce(-forceStrength * (dx / distance), -forceStrength * (dy / distance));
  } else if (playerPolarity === 'south') {
    // South facing: Attract if opposite
    worldMagnet.applyForce(forceStrength * (dx / distance), forceStrength * (dy / distance));
  }

  // Optional player movement (WASD)
  if (kb.pressing('a')) {
    playerMagnet.vel.x = -3;
  } else if (kb.pressing('d')) {
    playerMagnet.vel.x = 3;
  } else {
    playerMagnet.vel.x = 0;
  }

  if (kb.pressing('w')) {
    playerMagnet.vel.y = -3;
  } else if (kb.pressing('s')) {
    playerMagnet.vel.y = 3;
  } else {
    playerMagnet.vel.y = 0;
  }

}
