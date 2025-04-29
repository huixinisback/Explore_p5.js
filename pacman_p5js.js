// pacman-p5.js (pure p5.js version)
let pacman;
let walls = [];
let pellets = [];
let pelletSpawnPoints = [];
let score = 0;

function setup() {
  createCanvas(400, 400);

  // Pac-Man setup
  pacman = {
    x: width / 2,
    y: height / 2,
    r: 15,
    vx: 0,
    vy: 0,
    color: 'yellow'
  };

  // Wall setup (as rects: x, y, w, h)
  walls = [
    [20, 50, 360, 20],
    [20, 340, 360, 20],
    [20, 70, 20, 100],
    [20, 250, 20, 100],
    [360, 70, 20, 100],
    [360, 250, 20, 100],
    [5, 160, 80, 20],
    [5, 240, 80, 20],
    [315, 160, 80, 20],
    [315, 240, 80, 20],
    [100, 110, 200, 20],
    [80, 290, 100, 20],
    [170, 250, 20, 60],
    [240, 150, 20, 190]
  ];

  // Pellet spawn points
  pelletSpawnPoints = [
    {x: 100, y: 100}, {x: 150, y: 100}, {x: 200, y: 100}, {x: 250, y: 100},
    {x: 55, y: 290}, {x: 55, y: 320}, {x: 90, y: 330}, {x: 120, y: 330},
    {x: 150, y: 330}, {x: 180, y: 330}, {x: 210, y: 330}, {x: 210, y: 300},
    {x: 210, y: 270}, {x: 210, y: 240}, {x: 280, y: 300}, {x: 280, y: 280},
    {x: 280, y: 260}, {x: 120, y: 200},
  ];

  for (let pt of pelletSpawnPoints) {
    pellets.push({
      x: pt.x,
      y: pt.y,
      r: 4,
      visible: true,
      lastEatenTime: 0
    });
  }
}

function draw() {
  background('black');

  // Move pacman
  pacman.x += pacman.vx;
  pacman.y += pacman.vy;

  // Wrap left/right
  if (pacman.x < 0) pacman.x = width;
  if (pacman.x > width) pacman.x = 0;

  // Wall collision (basic stop)
  for (let [x, y, w, h] of walls) {
    if (collidesRectCircle(x, y, w, h, pacman.x, pacman.y, pacman.r * 2)) {
      pacman.x -= pacman.vx;
      pacman.y -= pacman.vy;
      break;
    }
  }

  // Pellet collection
  for (let pellet of pellets) {
    if (pellet.visible && dist(pacman.x, pacman.y, pellet.x, pellet.y) < pacman.r + pellet.r) {
      pellet.visible = false;
      pellet.lastEatenTime = millis();
      score++;
    }
    if (!pellet.visible && millis() - pellet.lastEatenTime > 3000) {
      pellet.visible = true;
    }
  }

  // Draw walls
  noStroke();
  fill('blue');
  for (let [x, y, w, h] of walls) {
    rect(x, y, w, h);
  }

  // Draw pellets
  fill('white');
  noStroke();
  for (let pellet of pellets) {
    if (pellet.visible) {
      ellipse(pellet.x, pellet.y, pellet.r * 2);
    }
  }

  // Draw pacman
  fill(pacman.color);
  ellipse(pacman.x, pacman.y, pacman.r * 2);

  // Draw score
  fill('white');
  textSize(15);
  textAlign(LEFT, TOP);
  text("SCORE: " + score, 10, 10);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) pacman.vx = -2.5;
  else if (keyCode === RIGHT_ARROW) pacman.vx = 2.5;
  if (keyCode === UP_ARROW) pacman.vy = -2.5;
  else if (keyCode === DOWN_ARROW) pacman.vy = 2.5;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) pacman.vx = 0;
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) pacman.vy = 0;
}

function collidesRectCircle(rx, ry, rw, rh, cx, cy, d) {
  // Rect-circle collision detection
  let closestX = constrain(cx, rx, rx + rw);
  let closestY = constrain(cy, ry, ry + rh);
  let distance = dist(cx, cy, closestX, closestY);
  return distance < d / 2;
}