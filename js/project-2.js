let oscillator;

function setup() {
  const canvas = createCanvas(800, 400);
  
  canvas.parent('canvas');
  background(0);
  oscillator = new Oscillator();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  oscillator.oscillate();
  oscillator.display();
    
}

class Oscillator {
  constructor() {
    this.angle = createVector();
    this.velocity = createVector();
    this.acceleration = createVector(random(-0.002, 0.002), random(-0.002, 0.002));
    this.amplitude = createVector(random(width/2), random(height/2));
    this.offset = 0;
  }

  oscillate() {
    this.velocity.add(this.acceleration);
    this.angle.add(this.velocity);
  }

  display() {
    let x = sin(this.angle.x) * this.amplitude.x;
    let y = sin(this.angle.y) * this.amplitude.y;
    this.offset += 0.02;
    
    let r = random(255);
    let g = map(mouseX, 0, width, 0, 255);
    let b = map(mouseY, 0, height, 0, 255);

    push();
    translate(width/2, height/2);
    noStroke();
    fill(r, g, b, 50);
    ellipse(x, y, 30, 30);
    pop();
  }
}