function setup() {
  createCanvas(400, 400);
  frameRate(2)

}


let size = 60;
let corner = 15

function draw(){
  background(210);
  fill(100)
  noStroke()



  for (let y = random(15,320); y < 320; y += random(70, 300)) {
    for (let x = random(15,320); x < 320; x += random(70, 300)) {
      
      
      let shape1 = rect(x, y, size, size, corner)
      //let shape2 = rect(x+60, y+60, size, size, corner)
    
    }

  }
}
 