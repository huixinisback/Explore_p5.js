let ball;

function setup() {
  new Canvas(200, 256);
  ball = new Sprite();
  ball.d = 40;
  ball.x = 175;
  ball.color = 'blue';
}

function draw() {
  clear(); 
  movePlayerVelocity(); // <-- call movePlayer inside draw()
}

//controlling position
function movePlayer() {
    if (kb.pressing('left')) {
        ball.x -= 5;
    }

    if (kb.pressing('right')) {
        ball.x += 5;
    }

    if (kb.pressing('up')) {
        ball.y -= 5;
    }

    if (kb.pressing('down')) {
        ball.y += 5;
    }
}

//control velocity (UNIQUE!)
function movePlayerVelocity() {
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


