function preload() {
    // Load the model (.obj or .stl)
    myModel = loadModel('assets/avatar model.obj', true);
  }

function setup() {
    createCanvas(600, 400, WEBGL); // Enables 3D rendering mode
}

  
function draw() {
    background(200);

    rotateY(frameCount * 0.1); // Rotate cube
    rotateX(frameCount * 0.1);
    normalMaterial(); // Gives basic lighting effect
    model(myModel); // Draw the 3D model
}
