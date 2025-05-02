let player, fish, rope;

function setup() {
  new Canvas(800, 600);
  world.gravity.y = 0;

  player = new Sprite(400, 550, 30, 30, 'static');
  player.color = 'blue';

  fish = new Sprite(random(200, 600), 100, 30, 20);
  fish.color = 'orange';

  rope = new DistanceJoint(player, fish);
  rope.length = 200;     // fixed "rope" length
  rope.damping = 0.2;
  rope.frequency = 2;    // springiness
}

function draw() {
  background(255);

  // Fish randomly fights
  if (frameCount % 5 == 0) {
    let flee = p5.Vector.random2D().mult(2);
    fish.applyForce(flee);
  }

  // If rope is stretched (fish far), allow player to reel
  let distToPlayer = dist(fish.x, fish.y, player.x, player.y);
  let isTense = distToPlayer > rope.length * 0.95;

  if (kb.pressing('space') && isTense) {
    // Pull fish toward player
    let pullVec = createVector(player.x - fish.x, player.y - fish.y);
    pullVec.setMag(0.5); // adjust reel strength
    fish.applyForce(pullVec);
  }

  // Display tension bar
  fill(255);
  textSize(16);
  text(`Distance: ${Math.floor(distToPlayer)}`, 10, 20);
  text(`Rope Length: ${rope.length}`, 10, 40);

  // Win condition
  if (distToPlayer < 40) {
    fill(255);
    textSize(24);
    text('🎣 You caught the fish!', 280, 50);
    fish.vel.set(0, 0);
  }
}
