const sketchWidth = 600;
const sketchHeight = 600;
let audio;

//const weight = "Ñ@#W$9876543210?!abc;:+=-,._                    ";
const weight = '       .:-i|=+%O#@'
//const weight = '        .:░▒▓█';
//const weight = '█▓▒░:.        ';

let video;
let asciiDiv;

//settings

//beams
let thickness = 1.8
let density = 1
let detail = 200
let rimSize = 200
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

  video = createCapture(VIDEO);
  video.size(105, 42);
  video.position(sketchWidth/sketchWidth - 10, sketchHeight + 20);
  asciiDiv = createDiv();

/*
let slider;
  
  slider = createSlider(-200, 295, 200, 1);
  slider.position(sketchWidth / 2 - 100, sketchHeight - 50);
  slider.style('width', '200px');

  let rimSize = slider.value();
  //let sliderVal = slider.value();


  for (let sternCount = 0; sternCount < 100; sternCount += 1) {
    sterne.push({
      x: random(0, sketchWidth),
      y: random(0, sketchHeight),
      radius: random(1, maxSize),
      fade: random(0, 255),
      grow: Math.round(random(0,1))
    });
  }
  */
}

let offset = 0;

function draw() {
  //background('#040638');
  background(31, 26, 42);

  noStroke(); 
/*
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
  */
  //webcam
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      
      const avg = (r + g + b) / 3;
      const len = weight.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = weight.charAt(charIndex);
      
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);


  //beams
  let spectrum = fft.analyze();
  //console.log(spectrum);
  //stroke('#6257AD')
  stroke('rgba(160, 149, 230, 0.5)');
  strokeWeight(thickness)

  //80 percent
   beginShape();
   for(let angle = 10; angle < 350; angle += density) {
    
    const radius = spectrum[Math.round(angle / 500 * detail)];
    const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
    //const iradius = spectrum[Math.round(angle/360*detail+ribbon)]

       const x = radius * cos(Math.PI / 180 * angle);
       const y = radius * sin(Math.PI / 180 * angle);

       const ix = iradius * cos(Math.PI / 180 * angle);
       const iy = iradius * sin(Math.PI / 180 * angle);

    
    line(x+sketchWidth/2,y+sketchHeight/2,
    ix+sketchWidth/2,iy+sketchHeight/2);

   }
   endShape(CLOSE);
   
   //0-10 percent
   beginShape();
   for(let angle = 0; angle < 10; angle += density) {
    
    const radius = spectrum[Math.round(angle / 500 * detail)];
    const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
    //const iradius = spectrum[Math.round(angle/360*detail+ribbon)]

       const x = radius * cos(Math.PI / 180 * angle);
       const y = radius * sin(Math.PI / 180 * angle);

       const ix = iradius * cos(Math.PI / 180 * angle);
       const iy = iradius * sin(Math.PI / 180 * angle);

    
    line(x+sketchWidth/2,y+sketchHeight/2,
    ix+sketchWidth/2,iy+sketchHeight/2);

   }
   endShape(CLOSE);
   
   //80-100 percent
   
   
   beginShape();
   for(let angle = 350; angle < 360; angle += density) {
    
    const radius = spectrum[Math.round(angle / 500 * detail)];
    const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
    //const iradius = spectrum[Math.round(angle/360*detail+ribbon)]

       const x = radius * cos(Math.PI / 180 * angle);
       const y = radius * sin(Math.PI / 180 * angle);

       const ix = iradius * cos(Math.PI / 180 * angle);
       const iy = iradius * sin(Math.PI / 180 * angle);

    
    line(x+sketchWidth/2,y+sketchHeight/2,
    ix+sketchWidth/2,iy+sketchHeight/2);

   }
   endShape(CLOSE);

  //  let log = spectrum;
  //  fill()
  //  textSize(10);
  //  text(log, sketchWidth/sketchWidth, sketchHeight-(sketchHeight-10))
   
  let p = createP('j j u n g _ v i s i o n _ 1 . 0');
    p.style('font-size', '10px');
    p.position(sketchWidth - 157, sketchHeight + 10);

   }