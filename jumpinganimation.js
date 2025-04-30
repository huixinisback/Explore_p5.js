// Declare variables for body parts
let head, torso, leftLeg, rightLeg;
let onGround = true; // Used to track when character can jump

function setup() {
    // Create a p5play canvas and initialize physics world
    new Canvas(600, 400); // p5play's version of createCanvas (adds physics)
    world.gravity.y = 10; // Set gravity in the physics world

    // Ground sprite
    ground = new Sprite(300, 380, 600, 40, 'static'); 
    // Sprite(x, y, width, height, type)
    // 'static' means the sprite doesn't move or get affected by physics

    // Create main body parts (all are dynamic by default)
    torso = new Sprite(300, 300, 20, 50, 'dynamic'); // dynamic body by default
    head = new Sprite(300, 260, 30, 30, 'dynamic');
    leftLeg = new Sprite(290, 340, 10, 30, 'static');
    rightLeg = new Sprite(310, 340, 10, 30, 'static');

    // Connect torso to head with a fixed (non-rotating) joint
    new GlueJoint(torso, head);
    // GlueJoint: keeps two bodies rigidly connected — no relative motion

    // Connect legs to torso with rotating joints at specific anchor points
    new HingeJoint(torso, leftLeg, 290, 325);
    new DistanceJoint(torso, rightLeg, 310, 325);
    // RevoluteJoint: allows rotation like a hinge (like real legs!)
}

function draw() {
    clear();
    background(220); // p5 background function
    // Check if torso is touching the ground
    if (torso.colliding(ground)) {
        onGround = true; // character can jump
    }

    // Jump logic
    if (kb.presses('space') && onGround) {
        torso.vel.y = -10; 
        // .vel is a p5play feature for velocity. 
        // Negative y = upward jump in p5's coordinate system

        // Animate leg movement mid-jump
        
        rightLeg.rotation = 20;


    }

    // If we're in the air and falling, reset leg position
    if (!onGround && torso.vel.y > 0) {
        leftLeg.rotation = 0;
        rightLeg.rotation = 0;
  }
}
