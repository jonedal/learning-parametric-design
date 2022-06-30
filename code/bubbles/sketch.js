const numParticles = 100;
const particles = [];
const maxSpeed = 1;
const spring = 0.5; // speed calculation on collision
let size;

function setup() {
  createCanvas(500, 800);

  getAudioContext().suspend();
  userStartAudio();

  audio = new p5.AudioIn();
  audio.start();

  fft = new p5.FFT();
  fft.setInput(audio);

  level = audio.getLevel();

  // createParticles
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      radius: random(7,18),
      x: random(width), // position
      y: random(height),
      vx: random(-maxSpeed, maxSpeed), // velocity
      vy: random(-maxSpeed, maxSpeed) 
    });
  }
  noStroke();
  fill(0);
}

function draw() {
  background('#27273B');
  //fill(random(155,175),random(145,170),random(240,250));
  colorMode(HSB);
  fill(241, 38, 90);

  for (let i = 0; i < numParticles; i++) {
    // move particle
    particles[i].x += particles[i].vx;
    particles[i].y += particles[i].vy;

    // draw particle
    circle(particles[i].x, particles[i].y, particles[i].radius);

    // change direction if particle hits edge
    if (particles[i].x + particles[i].radius / 2 > width) {
      particles[i].vx *= -1;
    } else if (particles[i].x - particles[i].radius / 2 < 0) {
      particles[i].vx *= -1;
    }
    if (particles[i].y + particles[i].radius / 2 > height) {
      particles[i].vy *= -1;
    } else if (particles[i].y - particles[i].radius / 2 < 0) {
      particles[i].vy *= -1;
    }

    // calculate collisions
    for (let j = i + 1; j < numParticles; j++) {
      let dx = particles[j].x - particles[i].x;
      let dy = particles[j].y - particles[i].y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = particles[j].radius / 2 + particles[i].radius / 2;
      if (distance < minDist) {
        let angle = atan2(dy, dx);
        let targetX = particles[i].x + cos(angle) * minDist;
        let targetY = particles[i].y + sin(angle) * minDist;
        let ax = (targetX - particles[j].x) * spring;
        let ay = (targetY - particles[j].y) * spring;
        particles[i].vx -= ax;
        particles[i].vy -= ay;
        particles[j].vx += ax;
        particles[j].vy += ay;
      }
    }
  }
}
