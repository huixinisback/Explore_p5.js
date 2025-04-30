let player;
let x_direction = 'left'
let y_direction = 'down'
let chacdownleft, chacdownright ,chacupleft,chacupright;
function preload() {
  playerImg = loadImage('assets/player.png');
  bg = loadImage('assets/background.png');
  chacdownleft = loadImage('assets/character1.png');
  chacdownright = loadImage('assets/character2.png');
  chacupright = loadImage('assets/character3.png');
  chacupleft = loadImage('assets/character4.png');
}

function setup() {
  new Canvas(800, 400);
  player = new Sprite(width/2, height/2);
  player.img = chacdownleft;
  //player.scale = 0.5; // optional

}

function draw(){
    clear();
    image(bg, 0, 0, width, height); // draw image to fill canvas
    stroke(0);        // border color (black)
    strokeWeight(2);  // thickness
    noFill();         // no fill inside
    rect(0, 0, width, height);

    if(kb.pressing('left')){
      x_direction = 'left'
      player.x -= 1
      if(y_direction=='up'){
        player.y -= 1
        player.img = chacupleft
      }else{
        player.y += 1
        player.img = chacdownleft
      }
    }
  
    if(kb.pressing('right')){
      x_direction = 'right'
      player.x += 1
      if(y_direction=='up'){
        player.y -= 1
        player.img =chacupright
      }else{
        player.y += 1
        player.img = chacdownright
      }
    }
  
    if(kb.pressing('up')){
      y_direction = 'up'
      player.y -=1
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
      player.y +=1
      if(x_direction =='left'){
        player.x -= 1
        player.img = chacdownleft
      }else{
        player.x += 1
        player.img = chacdownright
      }
    }

}
