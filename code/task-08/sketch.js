const sketchHeight = 400
const sketchWidth = 400


const particles = [];
let countSlider;
let sizeSlider;


function setup() {
  createCanvas(sketchWidth, sketchHeight);

  countSlider = createSlider(1,500,100,);
  countSlider.position(sketchWidth / 2 - 100, sketchHeight + 50);
  countSlider.style('width', '200px');

  sizeSlider = createSlider(4,30,7);
  sizeSlider.position(sketchWidth / 2 - 100, sketchHeight + 20);
  sizeSlider.style('width', '200px');
  
  let pCount = createP('count');
  pCount.position(sketchWidth / 2 - 160, sketchHeight + 35)
  pCount.style('font-size', '15px');

  let pSize = createP('size');
  pSize.position(sketchWidth / 2 - 160, sketchHeight + 5)
  pSize.style('font-size', '15px');

}


function draw() {
  background('#27273B');
  fill(170,150,245);
  let speed = 2
  let count = countSlider.value();
  let size = random(sizeSlider.value() - 3, sizeSlider.value()+3)

   //start
   for (let i = 0; i < count; i += 1) {
    particles.push({
      radius: size,
      
      x: random(0,sketchWidth),
      y: random(0,sketchHeight),
      
      vx: random(-speed, speed), 
      vy: random(-speed, speed) 
    });
  }
  noStroke();

  for (let i = 0; i < count; i += 1) {
    //move
    particles[i].x += particles[i].vx;
    particles[i].y += particles[i].vy;

    //draw
    circle(particles[i].x, particles[i].y, particles[i].radius);

   //richtungswechsel
    //let snap = fft.analyze();

    if (particles[i].x + particles[i].radius / 2 > sketchWidth) 
    {particles[i].vx *= -1;}
    else if (particles[i].x - particles[i].radius / 2 < 0) 
    {particles[i].vx *= -1;}

    if (particles[i].y + particles[i].radius / 2 > height) 
    {particles[i].vy *= -1;}
    else if (particles[i].y - particles[i].radius / 2 < 0) 
    {particles[i].vy *= -1;}

    //if (snap > 100) {particles[i].vy *= -1;}
    
  
    


    
  
  }
}
