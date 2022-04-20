const sketchWidth = 400;
const sketchHeight = 400;
const margin = 100;
const pointCount = 90;



function setup() {
  createCanvas(sketchWidth, sketchHeight);
  frameRate(30)
}
  
function draw() {
  //background('#361C0C');
  //background('lightBlue');
  background('#040638');

  noStroke(); 

  const size = 5;
  let offset = 0;

  for (let nx = 0; nx < 400; nx += size) {
    for (let ny = 0; ny < 400; ny += size) {
    
      const colorValue = noise(
        nx / 40,
        ny / 40,
        offset
      );
      fill(25, colorValue * 20, 50);
      rect(nx, ny, size);
    }
  }

  offset += 0.003;


   //schein
   noStroke()
   fill('#1B1A38')
   circle(random(198,202),random(198,202),random(130,140))

   //schein 2
   noStroke()
   fill('#232338')
   circle(random(198,202),random(198,202),random(100,110))



   //sterne
   noStroke()
      fill('#FFF8E6')
   for (let y = 0; y < sketchHeight; y += 10) {
    const circleDiameter = random(1, 3);
    circle(random(10, 390), random(10, 390), circleDiameter);
    
   }


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
          random(185, 215),
          random(185, 215)
        );
      }
      endShape();

    

    }

