const sketchWidth = 750;
const sketchHeight = 750;
let audio;
let size = 1
//let nodes = 10
//let rand = 20
let rSlider
let nSlider
let noiseSpeed = 0.01
let offset = 0;


function setup() {
  createCanvas(sketchWidth, sketchHeight);
  //frameRate(20)

  getAudioContext().suspend();
  userStartAudio();

  audio = new p5.AudioIn();
  audio.start();
  let sources = audio.getSources();
  console.log(sources);
  //audio.setSource(1);

  fft = new p5.FFT();
  fft.setInput(audio);

  rSlider = createSlider(0.1, 25, 10, 0.1);
  rSlider.position(sketchWidth / 2 - 100, sketchHeight + 10)
  rSlider.style('width', '200px');

  nSlider = createSlider(10,150,20,1);
  nSlider.position(sketchWidth / 2 - 100, sketchHeight + 30)
  nSlider.style('width', '200px');
}
  
function draw() {
  //background('#361C0C');
  //background('lightBlue');
  background('#040638');

  noStroke();
  //kosmos
  const size = 10;
  for (let nx = 0; nx < sketchWidth; nx += size) {
    for (let ny = 0; ny < sketchHeight; ny += size) {
    
      const colorValue = noise(
        nx / 200, ny / 200, offset);
        fill(30, 20, colorValue * 150);
      rect(nx, ny, size);
    }
  }

  offset += noiseSpeed;

  
  let rand = rSlider.value();
  let spectrum = fft.analyze();
  let nodes = nSlider.value();
   
   //rand
    stroke('rgba(10,250,10,0.3)');
    //stroke(random(230,250),random(180,200),random(30,40));
    //strokeWeight(random(4,8));
    //fill(random(250,280),random(220,240),random(50,60));
    noFill();
    strokeWeight(1.5);

    for (let i = 0; i < 300; i += 15) {
      const nx = noise(i);
  
      beginShape();
      for(let angle = 90; angle < 460; angle += nodes) {
        const radius = size + spectrum[Math.round(180 / 600 + nx + random(rand))];
        const x = radius * cos(Math.PI / 180 * angle);
        const y = radius * sin(Math.PI / 180 * angle);
        curveVertex(x + sketchWidth / 2, y + sketchHeight / 2);
      }
      endShape(CLOSE);

    }
  


    //noLoop()

}

