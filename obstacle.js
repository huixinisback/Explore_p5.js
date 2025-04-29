let ball;
let wall1, wall2;

function setup() {
    width = 400
    height = 400
    new Canvas(width, height);
    ball = new Sprite();
    ball.d = 40;
    ball.color = 'blue';

    // Create wall obstacles
    wall1 = new Sprite(200, 100, 300, 20, 'static'); // (x, y, width, height)
    wall1.color = 'red';

    wall2 = new Sprite(100, 300, 20, 150, 'static');
    wall2.color = 'green';
}

function draw() {
    
    clear();
    movePlayer();
     // Border
    rect(0, 0, width, height);
}

function movePlayer() {
    ball.x = constrain(ball.x, 20, width-20);
    ball.y = constrain(ball.y, 20, height-20);

    if (kb.pressing('left')) {
        ball.vel.x = -5;
    }
    else if (kb.pressing('right')) {
        ball.vel.x = 5;
    }
    else {
        ball.vel.x = 0;
    }

    if (kb.pressing('up')) {
        ball.vel.y = -5;
    }
    else if (kb.pressing('down')) {
        ball.vel.y = 5;
    }
    else {
        ball.vel.y = 0;
    }
}
