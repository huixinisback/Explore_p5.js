let player, fish;
let pulling = false;

function setup() {
  new Canvas(800, 600);
  player = new Sprite(400, 300, 30, 30);
  player.color = 'blue';

  fish = new Sprite(500, 300, 20, 20);
  fish.color = 'orange';
}

function draw() {
  background(255);

  // Simulate fish swimming away randomly
  let fishPull = createVector(random(-1, 1), random(-1, 1)).mult(0.5);
  fish.vel.add(fishPull);
  fish.vel.limit(2); // limit fish speed

  // Pulling mechanic: player pulls fish toward self when holding space
  if (kb.pressing('space')) {
    let pullVec = createVector(player.x - fish.x, player.y - fish.y);
    pullVec.setMag(0.5); // adjust pull strength
    fish.vel.add(pullVec);      
  }

  // Optional: Show distance
  let distToFish = dist(player.x, player.y, fish.x, fish.y);
  textSize(16);
  fill(0);
  text(`Distance: ${distToFish.toFixed(2)}`, 10, 20);

  // Optional win condition
  if (distToFish < 30) {
    text('You caught the fish!', width/2 - 60, height/2);
    fish.vel.set(0, 0);
  }
}
