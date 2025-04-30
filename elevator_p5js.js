let player;
let elevator;
let floor;
let gravity = 0.5;
let jumpPower = -10;

function setup() {
    createCanvas(400, 400);

    // Elevator platform
    elevator = {
        x: 150,
        y: 100,
        w: 100,
        h: 20,
        vy: 0, // vertical speed
        upSpeed: -1.5,
        downSpeed: 1,
        rangeTop: 150,
        rangeBottom: 300
    };

    // Player
    player = {
        x: 180,
        y: 250,
        w: 30,
        h: 30,
        vy: 0,
        onGround: false
    };
}

function draw() {
    background(30);

    // Elevator logic
    if (playerStandingOnElevator()) {
        elevator.vy = elevator.upSpeed;
    } else if (elevator.y < elevator.rangeBottom) {
        elevator.vy = elevator.downSpeed;
    } else {
        elevator.vy = 0;
    }

    elevator.y += elevator.vy;
    elevator.y = constrain(elevator.y, elevator.rangeTop, elevator.rangeBottom);

    // Gravity for player
    player.vy += gravity;
    player.y += player.vy;

    // Floor collision
    if (player.y + player.h > height) {
        player.y = height - player.h;
        player.vy = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }

    // Elevator collision
    if (player.y + player.h > elevator.y &&
        player.y + player.h < elevator.y + elevator.h &&
        player.x + player.w > elevator.x &&
        player.x < elevator.x + elevator.w &&
        player.vy >= 0) {

        player.y = elevator.y - player.h;
        player.vy = 0;
        player.onGround = true;
    }

    // Player controls
    if (keyIsDown(LEFT_ARROW)) {
        player.x -= 3;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.x += 3;
    }
    if (keyIsDown(UP_ARROW) && player.onGround) {
        player.vy = jumpPower;
        player.onGround = false;
    }

    // Draw elevator
    fill(200, 100, 50);
    rect(elevator.x, elevator.y, elevator.w, elevator.h);

    // Draw player
    fill(50, 200, 255);
    rect(player.x, player.y, player.w, player.h);

}

function playerStandingOnElevator() {
    return player.y + player.h === elevator.y &&
            player.x + player.w > elevator.x &&
            player.x < elevator.x + elevator.w;
}
