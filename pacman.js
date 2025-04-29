// pacman.js
let pacman;
let walls;
let pelletSpawnPoints = [];
let score=0;


function setup() {
    const width = 400;
    const height = 400;
    new Canvas(width, height);


    // Create pacman sprite
    pacman = new Sprite();
    pacman.d = 30;
    pacman.color = 'yellow';

    // Create wall group
    walls = new Group();
    // new Sprite(x, y, width, height, type) type	(optional): 'static', 'dynamic', 'kinematic' (physics type)	'static'
    //top
    walls.add(new Sprite(200, 60, 360, 20, 'static'));
    //bottom
    walls.add(new Sprite(200, 360, 360, 20, 'static'));
    //left
    walls.add(new Sprite(30, 120, 20, 120, 'static'));
    walls.add(new Sprite(30, 300, 20, 120, 'static'));
    //right
    walls.add(new Sprite(370, 120, 20, 120, 'static'));
    walls.add(new Sprite(370, 300, 20, 120, 'static'));
    //guide left
    walls.add(new Sprite(45, 170, 80, 20, 'static'));
    walls.add(new Sprite(45, 250, 80, 20, 'static'));
    //guide right
    walls.add(new Sprite(350, 170, 80, 20, 'static'));
    walls.add(new Sprite(350, 250, 80, 20, 'static'));
    //innerwalls
    walls.add(new Sprite(200, 120, 200, 20, 'static'));
    walls.add(new Sprite(130, 300, 100, 20, 'static'));
    walls.add(new Sprite(180, 280, 20, 60, 'static'));
    walls.add(new Sprite(250, 260, 20, 190, 'static'));

    //settings
    walls.color = 'blue';
    walls.strokeWeight = 0
    
    pelletSpawnPoints = [
        {x: 100, y: 100},
        {x: 150, y: 100},
        {x: 200, y: 100},
        {x: 250, y: 100},
        {x: 55, y: 290},
        {x: 55, y: 320},
        {x: 90, y: 330},
        {x: 120, y: 330},
        {x: 150, y: 330},
        {x: 180, y: 330},
        {x: 210, y: 330},
        {x: 210, y: 300},
        {x: 210, y: 270},
        {x: 210, y: 240},
        {x: 280, y: 300},
        {x: 280, y: 280},
        {x: 280, y: 260},       
        {x: 120, y: 200},
        // Add more as needed
      ];
      
    pellets = new Group();
    spawnPellets();
    

}

function draw() {
    
    clear();
    movePacman();
    wrapAround();
    // Check for pellet collection
    for (let pellet of pellets) {
        if (pacman.overlapping(pellet) && pellet.visible) {
            score += 1; 
            pellet.visible = false;
        pellet.collider = 'none';

        // Reappear after 3 seconds (3000ms)
        setTimeout(() => {
            pellet.visible = true;
            pellet.collider = 'circle';
        }, 3000);
        }
    }
   
    background('black')
    fill('white');
    textSize(15);
    textAlign(LEFT, TOP);
    text("SCORE: " + score, 10, 10); // top-left corner

    
}

function movePacman() {
    if (kb.pressing('left')) {
        pacman.vel.x = -2.5;
    } else if (kb.pressing('right')) {
        pacman.vel.x = 2.5;
    } else {
        pacman.vel.x = 0;
    }

    if (kb.pressing('up')) {
        pacman.vel.y = -2.5;
    } else if (kb.pressing('down')) {
        pacman.vel.y = 2.5;
    } else {
        pacman.vel.y = 0;
    }
}

function wrapAround() {
    // Wrap left/right
    if (pacman.x < 0) {
        pacman.x = width;
    } else if (pacman.x > width) {
        pacman.x = 0;
    }

}

function spawnPellets() {
    for (let pt of pelletSpawnPoints) {
        let pellet = new Sprite(pt.x, pt.y);
        pellet.d = 8;
        pellet.color = 'white';
        pellet.stroke = 'gray';
        pellet.collider = 'circle';
        pellets.add(pellet);
    }
}


