const sketchWidth = 400;
const sketchHeight = 400;
let angleOffset = 0

function setup() {
  createCanvas(sketchWidth, sketchHeight);
  frameRate(50)
}
  
function draw() {
  background('lightBlue');
  //noFill();

  stroke('blue')
  strokeWeight(3);
  
  let radius = -2
  beginShape();
    for (let angle = 0; angle < 10000; angle += 50) {
      radius += 1;
      const x = radius * cos(Math.PI / 180 * angle + angleOffset);
      const y = radius * sin(Math.PI / 180 * angle + angleOffset);

      vertex(x + sketchWidth/2, y + sketchHeight/2);
  
    }
  
  endShape();
  
  angleOffset += 1;
  
  //noLoop()
}
