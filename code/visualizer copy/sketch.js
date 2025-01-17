const sketchWidth = 600;
const sketchHeight = 600;
let audio;

//settings

//beams
let thickness = 1.8
let density = 1
let detail = 200
let rimSize = 150
let rimFlutter = 5
let ribbon = 1

//stars
const sterne = [];
const maxSize = 4;
const growValue = 0.07;
let offsetX = 0;

//background
let noiseSpeed = 0.015



function setup() {
  createCanvas(sketchWidth, sketchHeight);
  frameRate(30);

  getAudioContext().suspend();
  userStartAudio();

  audio = new p5.AudioIn();
  audio.start();

  fft = new p5.FFT();
  fft.setInput(audio);


/*
let slider;
  
  slider = createSlider(-200, 295, 200, 1);
  slider.position(sketchWidth / 2 - 100, sketchHeight + 30);
  slider.style('width', '200px');

  let rimSize = slider.value();
  //let sliderVal = slider.value();
*/



  

  for (let sternCount = 0; sternCount < 100; sternCount += 1) {
    sterne.push({
      x: random(0, sketchWidth),
      y: random(0, sketchHeight),
      radius: random(1, maxSize),
      fade: random(0, 255),
      grow: Math.round(random(0,1))
    });
  }
}

let offset = 0;

function draw() {
  //background('#040638');

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
          

  //sterne
  noStroke()
  //fill('grey')
  for (let s = 0; s < sterne.length; s += 1) {
    fill(255, 255, 255, sterne[s].radius / 0.5 * 15);
    circle(sterne[s].x + offsetX, sterne[s].y, sterne[s].radius);

    if (sterne[s].grow) {
      sterne[s].radius += growValue;
      if (sterne[s].radius > maxSize) {
        sterne[s].grow = false;
      }
    } else {
      sterne[s].radius -= growValue;
      if (sterne[s].radius < 0) {
        sterne[s].x = random(0, sketchWidth);
        sterne[s].y = random(0, sketchHeight);
        sterne[s].grow = true;
      }
    }

    sterne[s].x += random(-0.1, 0.1);
    sterne[s].y += random(-0.1, 0.1);
  }
  
  //beams
  let spectrum = fft.analyze();
  //console.log(spectrum);
  stroke('#6257AD')
  //colorMode(HSB, 120)
  //stroke(spectrum, 70, 90)
  strokeWeight(thickness)

  //top half
   beginShape();
   for(let angle = 0; angle < 180; angle += density) {
    
    const radius = spectrum[Math.round(angle / 500 * detail)];
    //const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
    const iradius = spectrum[Math.round(angle/360*detail+ribbon)]

       const x = radius * cos(Math.PI / 180 * angle);
       const y = radius * sin(Math.PI / 180 * angle);

       const ix = iradius * cos(Math.PI / 180 * angle);
       const iy = iradius * sin(Math.PI / 180 * angle);

    
    line(x+sketchWidth/2,y+sketchHeight/2,
    ix+sketchWidth/2,iy+sketchHeight/2);

   }
   endShape(CLOSE);
   
   //bottom half
   beginShape();
   for(let angle = 180; angle < 360; angle += density) {
    
    const radius = spectrum[Math.round(angle / 500 * detail)];
    //const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
    const iradius = spectrum[Math.round(angle/360*detail+ribbon)]

       const x = radius * cos(Math.PI / 180 * angle);
       const y = radius * sin(Math.PI / 180 * angle);

       const ix = iradius * cos(Math.PI / 180 * angle);
       const iy = iradius * sin(Math.PI / 180 * angle);

    
    line(x+sketchWidth/2,y+sketchHeight/2,
    ix+sketchWidth/2,iy+sketchHeight/2);

   }
   endShape(CLOSE);

  
  
   //focalpoint
   //const pointCount = random(10,20);
   
   /*noFill()
   stroke('rgba(255,255,255,0.7)')
   strokeWeight(random(1,3));
   
   beginShape();
   for (let p = 0; p < pointCount; p += 1) {
     curveVertex(
       random(sketchWidth-20, sketWidth+20),
       random(sketHeight-20, sketHeight+20)
     );
   }
   endShape();
   */

   //noLoop()

   }