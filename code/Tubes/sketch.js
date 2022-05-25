const sketchHeight = 600;
const sketchWidth = 600;
//let add = 10
let offset = 0;
let rSlider;
let audio;
let level;


function setup() {
  createCanvas(sketchWidth, sketchHeight);
  rSlider = createSlider(5, 100, 60, 1);

  getAudioContext().suspend();
  userStartAudio();

  audio = new p5.AudioIn();
  audio.start();
  let sources = audio.getSources();
  console.log(sources);
  //audio.setSource(1);

  fft = new p5.FFT();
  fft.setInput(audio);
  
}

function draw(){
  background(30);
  noFill();
  strokeWeight(3);
  stroke('rgba(100,190,120,0.2)');
  let spectrum = fft.analyze();
  let radius = rSlider.value();
  level = audio.getLevel();
  
  for (let x = 100; x < 500; x += 1) {
    const y = noise(x / 200 + offset);
    circle(x, y * 600, radius * (level * 2));
  }

  offset += 0.02;

  endShape();
  
  //noLoop();
}