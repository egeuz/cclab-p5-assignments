const agents = [];
const numberOfAgents = 100;
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');

  for (let i=0; i< numberOfAgents; i++) {
    let agent = new Agent(random(width), random(height));
    agents.push(agent);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let i=0; i< numberOfAgents; i++) {
    agents.push(new Agent(random(width), random(height)));
  }
}

function draw() {
  background(0);
  agents.forEach((agent) => {
    agent.applyBehaviors(agents);
    agent.run();
  });
}

/*** AGENT CLASS ***/

class Agent {
  constructor(x, y) {
    this.acceleration = createVector();
    this.velocity = p5.Vector.random2D();
    this.location = createVector(x, y);

    this.angle = 0;
    this.radius = 6.0;
    this.maxspeed = 4;
    this.maxforce = 0.1;
  }

  run() {
    this.update();
    this.checkEdges();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkEdges() {
    if(this.location.x < this.radius * -1) this.location.x = width + this.radius;
    if(this.location.y < this.radius * -1) this.location.y = height + this.radius;
    if(this.location.x > width + this.radius) this.location.y = this.radius * -1;
    if(this.location.y > height + this.radius) this.location.y = this.radius * -1; 
  }

  display() {
    let theta = this.velocity.heading() + Math.PI / 2;
    fill(255);
    noStroke();
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    beginShape();
    vertex(0, this.radius * -2);
    vertex(this.radius * -1, this.radius * 2);
    vertex(this.radius, this.radius * 2);
    endShape();
    pop();
  }

  /**** BEHAVIOR METHODS ****/
  applyBehaviors(vehicles) {
    //behaviors to apply
    let separate = this.separate(vehicles);
    let cohesion = this.cohesion(vehicles);
    let align = this.align(vehicles);
    // let seekMouse = this.seek(createVector(mouseX, mouseY));

    //behavior weights
    // separate.mult(1.5);
    // cohesion.mult(1);
    // align.mult(1);
    // seekMouse.mult(0.1);

    //apply them here
    this.applyForce(separate);
    this.applyForce(cohesion);
    this.applyForce(align);
    // this.applyForce(seekMouse);
  }

  seek(target) {
    let desiredVelocity = p5.Vector.sub(target, this.location);
    let magnitude = (desiredVelocity.mag() < 100) ? map(desiredVelocity.mag(), 0, 100, 0, this.maxspeed) : this.maxspeed;
    desiredVelocity.normalize();
    desiredVelocity.mult(magnitude);
    //return difference between desired and current velocity;
    return p5.Vector.sub(desiredVelocity, this.velocity).limit(this.maxforce);
  }

  align(vehicles) {
    const searchRadius = this.radius * 5;
    let count = 0;
    let sum = createVector();

    vehicles.forEach((vehicle) => {
      let distance = p5.Vector.dist(this.location, vehicle.location);
      if(distance > 0 && distance < searchRadius) {
        sum.add(vehicle.velocity);
        count++;
      }
    });

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }

    return sum;
  }

  separate(vehicles) {
    const desiredSeparation = this.radius * 5;
    let count = 0;
    let sum = createVector();

    vehicles.forEach((vehicle) => {
      let distance = p5.Vector.dist(this.location, vehicle.location);
      if(distance > 0 && distance < desiredSeparation) {
        let difference = p5.Vector.sub(this.location, vehicle.location);
        difference.normalize();
        difference.div(distance);
        sum.add(difference);
        count++;
      }

      if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        sum.sub(this.velocity);
        sum.limit(this.maxforce);
      }
      return sum;
    });
  }

  cohesion(vehicles) {
    const searchRadius = this.radius * 5;
    let count = 0;
    let sum = createVector();

    vehicles.forEach((vehicle) => {
      let distance = p5.Vector.dist(this.location, vehicle.location);
      if(distance > 0 && distance < searchRadius) {
        sum.add(vehicle.location);
        count++;
      }
    });

    if(count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector();
    }
  }



    /**** HELPER METHODS ****/
    applyForce(force) {
      this.acceleration.add(force);
    }

  
}