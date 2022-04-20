const sketchWidth = 400;
const sketchHeight = 400;
const margin = 100;
const pointCount = 90;



function setup() {
  createCanvas(sketchWidth, sketchHeight);
  frameRate(10)
}
  
function draw() {
  background('#361C0C');
  
  
  
   //aussen
      stroke(random(230,250),random(180,200),random(30,40));
      strokeWeight(random(4,8));
      fill(random(250,280),random(220,240),random(50,60));

      beginShape();
      for(let angle = 0; angle < 360; angle += 15) {
        const radius = random(35, 40);
        const x = radius * cos(Math.PI / 180 * angle);
        const y = radius * sin(Math.PI / 180 * angle);
        vertex(x + sketchWidth / 2, y + sketchHeight / 2);
      }
      endShape(CLOSE);

   //innen
      stroke('#FFF8E6')
      strokeWeight(random(10,20));
      
      beginShape();
      for (let p = 0; p < pointCount; p += 1) {
        curveVertex(
          random(190, 210),
          random(190, 210)
        );
      }
      endShape();



}


