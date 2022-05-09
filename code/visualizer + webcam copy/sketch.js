const sketchWidth = 800;
const sketchHeight = 800;
let audio;

//const weight = "Ñ@#W$9876543210?!abc;:+=-,._                    ";
const weight = '       .:-i|=+%O#@'
//const weight = '        .:░▒▓█';
//const weight = '█▓▒░:.        ';

let video;
let asciiDiv;

//settings

//beams
let thickness = 1.6
let density = 0.4 //0.3, 2
let detail = 800 //200, 800, 1500
let rimSize
let rimFlutter = 5
let ribbon = 1

let effect = 90 //180, 90, 45, 360, ...
let flip = 270 //90, 270

let outerRim = 200
let outerEffect = 360

//stars
const sterne = [];
const maxSize = 4;
const growValue = 0.07;
let offsetX = 0;

//background
let noiseSpeed = 0.015


function setup() {
  createCanvas(sketchWidth, sketchHeight);
  frameRate(40);

  getAudioContext().suspend();
  userStartAudio();

  audio = new p5.AudioIn();
  let sources = audio.getSources();
  console.log(sources);
  audio.start();

  fft = new p5.FFT();
  fft.setInput(audio);


  video = createCapture(VIDEO);
  video.size(105, 42);
  video.position(sketchWidth/sketchWidth - 10, sketchHeight + 20);
  asciiDiv = createDiv();

  // //size slider
  // let slider;
  
  // slider = createSlider(-200, 295, 160, 1);
  // slider.position(sketchWidth / 2 - 100, sketchHeight - 50);
  // slider.style('width', '200px');

  // rimSize = slider.value();
  // //let sliderVal = slider.value();


  for (let sternCount = 0; sternCount < 100; sternCount += 1) {
    sterne.push({
      x: random(0, sketchWidth),
      y: random(0, sketchHeight),
      radius: random(1, maxSize),
      fade: random(0, 255),
      grow: Math.round(random(0,1))
    });
  }
   
  let p = createP('j j u n g _ v i s i o n _ 1 . 0');
    p.style('font-size', '10px');
    p.position(sketchWidth - 157, sketchHeight + 10);
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
  */        

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
  
  strokeWeight(thickness);
  //stroke('#6257AD')
  stroke('rgba(160, 149, 230, 0.3)');
  //stroke('#A095E6')
  

  
  translate(sketchWidth / 2, (sketchHeight / 2) + 80);
  rotate(Math.PI / 180 * flip);
   //top half
   beginShape();
   for(let angle = 0; angle < 360; angle += density) {
    
    const radius = spectrum[Math.round(angle / 500 * detail)];
    //const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
    const iradius = spectrum[Math.round(angle/400*detail+ribbon)]

       const x = radius * cos(Math.PI / -effect * angle);
       const y = radius * sin(Math.PI / -effect * angle);

       const ix = iradius * cos(Math.PI / -effect * angle);
       const iy = iradius * sin(Math.PI / -effect * angle);

    
    line(x,y,ix,iy);

   }
   endShape(CLOSE);
  
   //bottom half
   beginShape();
   for(let angle = 0; angle < 360; angle += density) {
    
    const radius = spectrum[Math.round(angle / 500 * detail)];
    //const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
    const iradius = spectrum[Math.round(angle/400*detail+ribbon)]

       const x = radius * cos(Math.PI / -effect * -angle);
       const y = radius * sin(Math.PI / -effect * -angle);

       const ix = iradius * cos(Math.PI / -effect * -angle);
       const iy = iradius * sin(Math.PI / -effect * -angle);

    
    line(x, y, ix, iy);

   }
   endShape(CLOSE);

   //outer rim
   stroke('rgba(160, 149, 230, 0.03)');
    //top half
    beginShape();
    for(let angle = 0; angle < 360; angle += density) {
     
     const radius = outerRim + spectrum[Math.round(angle / 500 * detail)];
     //const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
     const iradius = outerRim + spectrum[Math.round(angle/400*detail+ribbon)]
 
        const x = radius * cos(Math.PI / -outerEffect * angle);
        const y = radius * sin(Math.PI / -outerEffect * angle);
 
        const ix = iradius * cos(Math.PI / -outerEffect * angle);
        const iy = iradius * sin(Math.PI / -outerEffect * angle);
 
     
     line(x,y,ix,iy);
 
    }
    endShape(CLOSE);
   
    //bottom half
    beginShape();
    for(let angle = 0; angle < 360; angle += density) {
     
     const radius = outerRim + spectrum[Math.round(angle / 500 * detail)];
     //const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
     const iradius = outerRim + spectrum[Math.round(angle/400*detail+ribbon)]
 
        const x = radius * cos(Math.PI / -outerEffect * -angle);
        const y = radius * sin(Math.PI / -outerEffect * -angle);
 
        const ix = iradius * cos(Math.PI / -outerEffect * -angle);
        const iy = iradius * sin(Math.PI / -outerEffect * -angle);
 
     
     line(x, y, ix, iy);
 
    }
    endShape(CLOSE);
   


  //  let log = spectrum;
  //  fill()
  //  textSize(10);
  //  text(log, sketchWidth/sketchWidth, sketchHeight-(sketchHeight-10))
   
  

   }