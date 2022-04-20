const sketchWidth = 400;
const sketchHeight = 400;
const size = 100;

function setup() {
  createCanvas(sketchWidth, sketchHeight);
  frameRate(12)
}

function draw(){
  background(255);
  noStroke();
  
  //const columns = sketchWidth / size;
  //const rows = sketchHeight / size;

  const columns = sketchWidth / size;
  const rows = sketchHeight / size;

  for (let x = 0; x < columns; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      fill(random(10, 200), random(10,205), random(0,200));
      rect(x * size, y * size, size, size);
    }
  }
}