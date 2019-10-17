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
    this.location = createVector();
  }

  run() {
    this.display();
  }
  display() {
    this.location = createVector(mouseX, mouseY);
    ellipse(mouseX, mouseY, 55, 55);
    console.log(location);
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

  hasHit(ship) {
    
  }

  update() {
    this.velocity.add(acceleration);
    this.velocity.limit(maxspeed);
    this.location.add(velocity);
  }

  display() {
    fill(255, 0, 0);
    rect(this.location.x, this.location.y, 20, 20);
  }





}