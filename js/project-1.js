let ship;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');
  ship = new Ship();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  ship.run();
}

class Ship {
  constructor() {

  }
  run() {
    this.display();
  }
  display() {
    ellipse(mouseX, mouseY, 55, 55);
  }
}

class Bullet {
  constructor() {
    let location = createVector();
    let velocity = createVector();
    let acceleration = createVector();
    let maxspeed = 4;
  }

  launch() {

  }

  run() {
    update();
    checkHit();
  }

  update() {
    this.velocity.add(acceleration);
    this.velocity.limit(maxspeed);
    this.location.add(velocity);
  }





}