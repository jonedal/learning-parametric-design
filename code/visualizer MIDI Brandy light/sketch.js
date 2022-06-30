let thickness = 4;

var midiAccess=null;  // the MIDIAccess object.
var init = false;
var controller = null;
var controller_ids = {};
var svg;


function flipVisuals() {
  flip *= -1;
}

const sketchWidth = 1439;
const sketchHeight = 780;
let audio;

//settings
let rimSize;
let rimFlutter = 5;
let ribbon = 1;
outerRibbon = 0;

let flip = 270;

let outerEffect = 360;

let multSlider;
let detailSlider;
let densitySlider;
let thickSlider;
let rimSlider;
let effectSlider;
let threshSlider;

let pMultVal;
let pDetailVal;
let pDensityVal;
let pThickVal;
let pRimVal;
let pLevel;
let area;

let noiseSpeed = 0.008;

let angleOffset = 0;

let offset = 0;


function setup() {
  createCanvas(sketchWidth, sketchHeight);
  frameRate(40);

  getAudioContext().suspend();
  userStartAudio();

  audio = new p5.AudioIn();
  audio.start();
  let sources = audio.getSources();
  console.log(sources);
  //audio.setSource(1);

  fft = new p5.FFT();
  fft.setInput(audio);


  /*---------- GUI INITIALIZATION ----------*/
  initGui(); 
}



function draw() {
  //loudness
  let level = audio.getLevel(); 
  
  noStroke(); 
  const size = 8;
  let hue = 255
  let sat = 50;
  let bright = 30;

  colorMode(HSB);
  for (let nx = 0; nx < sketchWidth; nx += size) {
    for (let ny = 0; ny < sketchHeight; ny += size) {
    
      const colorValue = noise(
        nx / 1000, ny / 1000, offset);
        fill(hue, sat, colorValue * map(level, 0, 1, bright, bright + 15));
      rect(nx, ny, size);
    }
  }
  offset += noiseSpeed;
  
  
  let bloat = map(level, 0, 1, 20, 30);
  noFill();
  strokeWeight(2);
  stroke('rgba(178, 166, 255, 0.2)');
  ellipse(sketchWidth - 90, sketchHeight - 50, bloat * 2, 25);
  ellipse(sketchWidth - 90, sketchHeight - 50, bloat * 3, 25);
  ellipse(sketchWidth - 90, sketchHeight - 50, bloat * 4, 25);
  

  let effectMap = 1
  let mult = 470 //multSlider.value();
  let detail = 3.7;
  let density = 11;
  let thickness = 3;
  let effect = map(effectMap, 127, 1, 360);
  let alpha = 0.4;
  area = 2;


  colorMode(RGB);
  //beams
  strokeWeight(thickness);
  noFill();
  stroke('rgba(178, 166, 255, 0.4)');
  
  let spectrum = fft.analyze();
  
  
  translate(sketchWidth / 2, sketchHeight / 2);
  let rotation = 270;

  circle(0, 0, 100, 100);
  
  angleMode(DEGREES);
  rotate(rotation);

  angleMode(RADIANS);
   //top half
   beginShape();
   for(let angle = 0; angle < 360; angle += density) {
    
    const radius = area * spectrum[Math.round(angle / 500 * detail)];
    const iradius = area * spectrum[Math.round(angle / mult * detail + ribbon)]

       const x = radius * cos(Math.PI / -effect * angle);
       const y = radius * sin(Math.PI / -effect * angle);

       const ix = iradius * cos(Math.PI / -effect * angle);
       const iy = iradius * sin(Math.PI / -effect * angle);

      line(x,y,ix,iy);

   }
   endShape();
  
   //bottom half
   beginShape();
   for(let angle = 0; angle < 360; angle += density) {
    
    const radius = area * spectrum[Math.round(angle / 500 * detail)];
    const iradius = area * spectrum[Math.round(angle / mult * detail + ribbon)]

       const x = radius * cos(Math.PI / -effect * -angle);
       const y = radius * sin(Math.PI / -effect * -angle);

       const ix = iradius * cos(Math.PI / -effect * -angle);
       const iy = iradius * sin(Math.PI / -effect * -angle);

      line(x,y,ix,iy);


   }
   endShape();


  //slidervalues   
  pDetailVal.html(detail); 
  pDensityVal.html(density); 
  pThickVal.html(thickness); 
  pEffectVal.html(effect); 
  pTreshVal.html(threshSlider.value()); 
  pLevel.html(ceil(map(level, 0, 1, 0, 99)));
  
}
   