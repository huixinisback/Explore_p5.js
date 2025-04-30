let playerMagnet, worldMagnet;
let playerPolarity = 'north';

function setup() {
  createCanvas(800, 400);

  // Player Magnet
  playerMagnet = {
    x: 200,
    y: 200,
    w: 80,
    h: 20,
    vx: 0,
    vy: 0,
    mass: 3,
    color: 'blue'
  };

  // World Magnet
  worldMagnet = {
    x: 300,
    y: 200,
    w: 80,
    h: 20,
    vx: 0,
    vy: 0,
    mass: 3,
    color: 'red'
  };
}

function draw() {
  background(255);

  // === Text UI ===
  textSize(18);
  fill(0);
  textAlign(CENTER, TOP);
  text("MAGNETS ", 250, 30);
  text("Keys: ← = South | → = North ", 250, 50);

// --- Draw visible border around canvas ---
stroke(0);        // Border color (black)
strokeWeight(2);  // Border thickness
noFill();
rect(0, 0, width, height); // Outline the canvas

// --- Constrain player magnet within canvas ---
playerMagnet.x = constrain(playerMagnet.x, 0, width - playerMagnet.w);
playerMagnet.y = constrain(playerMagnet.y, 0, height - playerMagnet.h);

// --- Constrain world magnet within canvas ---
worldMagnet.x = constrain(worldMagnet.x, 0, width - worldMagnet.w);
worldMagnet.y = constrain(worldMagnet.y, 0, height - worldMagnet.h);

  // === Magnet Control ===
  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      playerPolarity = 'north';
      playerMagnet.color = 'blue';
    } else if (keyCode === RIGHT_ARROW) {
      playerPolarity = 'south';
      playerMagnet.color = 'red';
    }
  }

  // === Movement (WASD) ===
  playerMagnet.vx = 0;
  playerMagnet.vy = 0;
  if (keyIsDown(65)) playerMagnet.vx = -3; // A
  if (keyIsDown(68)) playerMagnet.vx = 3;  // D
  if (keyIsDown(87)) playerMagnet.vy = -3; // W
  if (keyIsDown(83)) playerMagnet.vy = 3;  // S

  // Update player position
  playerMagnet.x += playerMagnet.vx;
  playerMagnet.y += playerMagnet.vy;

  // === Magnet Physics ===
  let dx = worldMagnet.x - playerMagnet.x;
  let dy = worldMagnet.y - playerMagnet.y;
  let distance = dist(playerMagnet.x, playerMagnet.y, worldMagnet.x, worldMagnet.y);
  let forceStrength = constrain(1000 / (distance * distance), 0, 5);

  let fx = forceStrength * (dx / distance);
  let fy = forceStrength * (dy / distance);

  // Apply attraction or repulsion
  if (playerPolarity === 'north') {
    worldMagnet.vx -= fx;
    worldMagnet.vy -= fy;
  } else if (playerPolarity === 'south') {
    worldMagnet.vx += fx;
    worldMagnet.vy += fy;
  }

  // Damping
  worldMagnet.vx *= 0.98;
  worldMagnet.vy *= 0.98;

  // Update world magnet position
  worldMagnet.x += worldMagnet.vx;
  worldMagnet.y += worldMagnet.vy;

  // === Draw Magnets ===
  noStroke();
  fill(playerMagnet.color);
  rect(playerMagnet.x, playerMagnet.y, playerMagnet.w, playerMagnet.h);

  fill(worldMagnet.color);
  rect(worldMagnet.x, worldMagnet.y, worldMagnet.w, worldMagnet.h);
}
