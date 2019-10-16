function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
}