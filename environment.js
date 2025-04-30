let tile;
let tileWidth = 64;
let tileHeight = 64;
let player;
let x_direction = 'left'
let y_direction = 'down'
let chacdownleft, chacdownright ,chacupleft,chacupright;
let grassgeneration = 30 //every 15 s'
let randomNumbers = []

function preload() {
  tile = loadImage('assets/grasspatch2.png'); // your isometric tile image
  tile2 = loadImage('assets/grasspatch1.png'); // your isometric tile image
  chacdownleft = loadImage('assets/character1.png');
  chacdownright = loadImage('assets/character2.png');
  chacupright = loadImage('assets/character3.png');
  chacupleft = loadImage('assets/character4.png');
}

function setup() {
  new Canvas(1000,800);
  // Create player sprite and assign one animation to start
   player = new Sprite(width/2, height/2);
   player.img = chacdownleft
   
}

function draw() {
  background(100);
  grassgeneration-=1

  if(grassgeneration ==0){
    for (let i = 0; i < 5; i++) {
        let num = Math.floor(Math.random() * 100) + 1;
        randomNumbers.push(num);
      }
      grassgeneration = 30
  }

  
    camera.on()

   // Draw a grid of isometric tiles (repeat floor)
   for (let x = -width; x < width * 2; x += tileWidth-28) {
        for (let y = -height; y < height * 2; y += tileHeight-28) {
        let isoX = x-y;
        let isoY = (x + y) / 2;
        if (randomNumbers.includes(x)){
            image(tile2, isoX, isoY, tileWidth, tileHeight);
        }else{
            image(tile, isoX, isoY, tileWidth, tileHeight);
        }
        }
    } 

    camera.x = player.x
    camera.y = player.y

    camera.off()

  //walking
  
  if(kb.pressing('left')){
    x_direction = 'left'
    player.x -= 1
    if(y_direction=='up'){
      player.y -= 0.5
      player.img = chacupleft
    }else{
      player.y += 0.5
      player.img = chacdownleft
    }
  }

  if(kb.pressing('right')){
    x_direction = 'right'
    player.x += 1
    if(y_direction=='up'){
      player.y -= 0.5
      player.img =chacupright
    }else{
      player.y += 0.5
      player.img = chacdownright
    }
  }

  if(kb.pressing('up')){
    y_direction = 'up'
    player.y -=0.5
    if(x_direction=='left'){
      player.x -= 1
      player.img = chacupleft
    }else{
      player.x += 1
      player.img = chacupright
    }
  }

  if(kb.pressing('down')){
    y_direction = 'down'
    player.y +=0.5
    if(x_direction=='left'){
      player.x -= 1
      player.img = chacdownleft
    }else{
      player.x += 1
      player.img = chacdownright
    }
  }
 
}
