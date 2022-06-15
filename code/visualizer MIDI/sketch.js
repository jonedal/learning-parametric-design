let vistype = 'verts';
let thickness = 4;

var midiAccess=null;  // the MIDIAccess object.
var init = false;
var controller = null;
var controller_ids = {};
var svg;

/*---------- MIDI INITIALIZATION ----------*/

window.addEventListener('load', function() {
	if (navigator.requestMIDIAccess)
		navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
	else
		alert("No MIDI support present in your browser.  You're gonna have a bad time.")

} );

function onMIDIInit(midi) {
	midiAccess = midi;

	var haveAtLeastOneDevice=false;
	var inputs=midiAccess.inputs.values();
	for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
		input.value.onmidimessage = MIDIMessageEventHandler;
		haveAtLeastOneDevice = true;
	}

	if (!haveAtLeastOneDevice){
		alert("No MIDI input devices present.  You're gonna have a bad time.");
	}else{
		initD3();
	}
}

function initD3(){
	//load the json of the connected controller
	d3.json('midiController.korg.nanoKONTROL.json', function(err, data){
		controller = data;
		init = true;

		//create an array of ids for fast access
		for(var s = 0; s<controller.inputs.length; s++){
			for(var i = 0; i<controller.inputs[s].length; i++){
				controller_ids[controller.inputs[s][i].d[0]+"_"+controller.inputs[s][i].d[1]] = {s:s,i:i};
			}
		}
	});
}

function onMIDIReject(err) {
	alert("The MIDI system failed to start.  You're gonna have a bad time.");
}

function MIDIMessageEventHandler(event) {
	console.log(event.data);
	if(init){
		var id = controller_ids[event.data[0]+"_"+event.data[1]];
		//console.log(event.data[0], event.data[1], event.data[2], id);

		controller.inputs[id.s][id.i].v = event.data[2];

		// UPDATE
    console.log(controller.inputs[0][0].v);
    if (controller.inputs[0][0].v === 127) {
      vistype = 'verts';
    } else if (controller.inputs[0][2].v === 127) {
      vistype = 'points';
    } else if (controller.inputs[0][4].v === 127) {
      vistype = 'lines';
    } else if (controller.inputs[0][6].v === 127) {
      vistype = 'circs';
    } else if (controller.inputs[0][8].v === 127) {
      vistype = 'ellips';
    } else if (controller.inputs[0][10].v === 127) {
      vistype = 'rects';
    } else if (controller.inputs[0][17].v === 127) {
      location.reload();
    } else if (controller.inputs[0][16].v === 127) {
      flipVisuals();
	}
}

}
function flipVisuals() {
  flip *= -1;
}


const sketchWidth = 1420;
const sketchHeight = 780;
let audio;

//let weight = 'Ñ@#W$9876543210?!abc;:+=-,._                    ';
//let weight = '                    _.,-=+:;cba!?0123456789$W#@Ñ';
//let weight = '       .:-i|=+%O#@';
//let weight = '@#O%+=|i-:.       ';
//let weight = '        .:░▒▓█';
let weight = '█▓▒░:.        ';

let video;
let asciiDiv;

//settings

//beams
//let thickness = 1.5; // >> slider
//let density = 0.4; //0.3, 2 >> slider
//let detail = 900; //200, 800, 1500 >> slider
let rimSize;
let rimFlutter = 5;
let ribbon = 1;
outerRibbon = 0;
//let mult = 480; //500: ribbon = 1 >> slider

//let effect = 90; //45, 90, 180, 360 >> radiobuttons?
let flip = 270; //90, 270 >> button

//let outerRim = 150;
let outerEffect = 360;

//stars
const sterne = [];
const maxSize = 4;
const growValue = 0.07;
let offsetX = 0;

//background
//let noiseSpeed = 0.015;

let multSlider;
let detailSlider;
let densitySlider;
let thickSlider;
let rimSlider;
let effectSlider;
let threshSlider;

let flipButton;

let pMultVal;
let pDetailVal;
let pDensityVal;
let pThickVal;
let pRimVal;
let pLevel;
let area;

let peakDetect;




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


  multSlider = createSlider(400, 500, 470, 10);
    multSlider.position(sketchWidth / 2 - 100, sketchHeight + 13);
    multSlider.style('width', '200px');
    multSlider.style('height', '5px');
    multSlider.style('background', 'red');

  detailSlider = createSlider(100, 1500, 100, 50);
    detailSlider.position(sketchWidth / 2 - 100, sketchHeight + 53);
    detailSlider.style('width', '200px');
    detailSlider.style('height', '5px');

  densitySlider = createSlider(0.5, 5, 0.5, 0.01);
    densitySlider.position(sketchWidth / 2 - 100, sketchHeight + 93);
    densitySlider.style('width', '200px');
    densitySlider.style('height', '5px');

  thickSlider = createSlider(0.5, 5, 1.5, 0.5);
    thickSlider.position(sketchWidth / 2 - 100, sketchHeight + 133);
    thickSlider.style('width', '200px');
    thickSlider.style('height', '5px');

  rimSlider = createSlider(-400, 300, 130, 1);
    rimSlider.position(sketchWidth / 2 - 100, sketchHeight + 173);
    rimSlider.style('width', '200px');
    rimSlider.style('height', '5px');
  
  effectSlider = createSlider(1, 360, 45, 0.1);
    effectSlider.position(sketchWidth / 2 - 100, sketchHeight + 213);
    effectSlider.style('width', '200px');
    effectSlider.style('height', '5px');
  
  threshSlider = createSlider(0.1, 1, 0.6, 0.1);
    threshSlider.position(sketchWidth / 2 - 320, sketchHeight + 48);
    threshSlider.style('width', '75px');
    threshSlider.style('height', '5px');

    flipButton = createButton('FLIP');
    flipButton.position(160, sketchHeight + 7)
    flipButton.size(80);
    flipButton.mousePressed(flipVisuals);
    flipButton.style('background-color', 'rgba(160, 149, 230, 0.5)')





  let pTag = createP('jjung_vision_2.1 ___ (MIDI - CTRL) ___');
    pTag.style('font-size', '10px');
    pTag.position(sketchWidth - 370, sketchHeight + 1);
  
  let pData = createP('© JD - FHP (20341)');
    pData.style('font-size', '10px');
    pData.position(sketchWidth - 143, sketchHeight + 1);

  let pMult = createP('RIBBON');
    pMult.style('font-size', '10px');
    pMult.position(sketchWidth / 2 - 175, sketchHeight);  
  
  let pDetail = createP('DETAIL');
    pDetail.style('font-size', '10px');
    pDetail.position(sketchWidth / 2 - 175, sketchHeight + 40);  

  let pDensity = createP('DENSITY');
    pDensity.style('font-size', '10px');
    pDensity.position(sketchWidth / 2 - 175, sketchHeight + 80);  

  let pThick = createP('THICKNESS');
    pThick.style('font-size', '10px');
    pThick.position(sketchWidth / 2 - 175, sketchHeight + 120);  
  
  let pRim = createP('OUTER RIM');
    pRim.style('font-size', '10px');
    pRim.position(sketchWidth / 2 - 175, sketchHeight + 160);  
  
  let pEffect = createP('WINDING');
    pEffect.style('font-size', '10px');
    pEffect.position(sketchWidth / 2 - 175, sketchHeight + 200);  
  
  let pThresh = createP('= THR');
    pThresh.style('font-size', '8px');
    pThresh.position(sketchWidth / 2 - 272, sketchHeight + 62);  

  
  pMultVal = createP(multSlider.value());
    pMultVal.style('font-size', '12px');
    pMultVal.position(sketchWidth / 2 + 150, sketchHeight);  
 
  pDetailVal = createP(detailSlider.value());
    pDetailVal.style('font-size', '12px');
    pDetailVal.position(sketchWidth / 2 + 150, sketchHeight + 38);  
 
  pDensityVal = createP(densitySlider.value());
    pDensityVal.style('font-size', '12px');
    pDensityVal.position(sketchWidth / 2 + 150, sketchHeight + 78);  
 
  pThickVal = createP(thickSlider.value());
    pThickVal.style('font-size', '12px');
    pThickVal.position(sketchWidth / 2 + 150, sketchHeight + 118);  
  
  pRimVal = createP(rimSlider.value());
    pRimVal.style('font-size', '12px');
    pRimVal.position(sketchWidth / 2 + 150, sketchHeight + 158);  
  
  pEffectVal = createP(rimSlider.value());
    pEffectVal.style('font-size', '12px');
    pEffectVal.position(sketchWidth / 2 + 150, sketchHeight + 198);  
  
  pTreshVal = createP(threshSlider.value());
    pTreshVal.style('font-size', '9px');
    pTreshVal.position(sketchWidth / 2 - 318, sketchHeight + 59);  

  pLevel = createP();
    pLevel.style('font-size', '11px');
    pLevel.position(sketchWidth - 94, sketchHeight - 68);  





  peakDetect = new p5.PeakDetect(60, 100, threshSlider.value(), 5,);


  for (let sternCount = 0; sternCount < 150; sternCount += 1) {
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
  if (init == true) {
  //loudness
  let level = audio.getLevel(); 
  let bloat = map(level, 0, 1, 20, 50);
  background(31, 26, 42);
  noFill();
  strokeWeight(2);
  stroke('rgba(178, 166, 255, 0.2)');
  ellipse(sketchWidth - 90, sketchHeight - 50, bloat * 2, 25);
  ellipse(sketchWidth - 90, sketchHeight - 50, bloat * 3, 25);
  ellipse(sketchWidth - 90, sketchHeight - 50, bloat * 4, 25);
  
  noStroke(); 
      

  // //sterne
  // noStroke();
  // //fill('grey');
  // for (let s = 0; s < sterne.length; s += 1) {
  //   fill(255, 255, 255, sterne[s].radius / 0.5 * 15);
  //   circle(sterne[s].x + offsetX, sterne[s].y, sterne[s].radius);

  //   if (sterne[s].grow) {
  //     sterne[s].radius += growValue;
  //     if (sterne[s].radius > maxSize) {
  //       sterne[s].grow = false;
  //     }
  //   } else {
  //     sterne[s].radius -= growValue;
  //     if (sterne[s].radius < 0) {
  //       sterne[s].x = random(0, sketchWidth);
  //       sterne[s].y = random(0, sketchHeight);
  //       sterne[s].grow = true;
  //     }
  //   }

  //   sterne[s].x += random(-0.1, 0.1);
  //   sterne[s].y += random(-0.1, 0.1);
  // }
  


  // let mult = multSlider.value();
  // let detail = detailSlider.value();
  //let density = densitySlider.value();
  // let thickness = thickSlider.value();
  // let outerRim = rimSlider.value();
  // let effect = effectSlider.value();
  // let thresh = threshSlider.value();

  let mult = multSlider.value();
  let detail = map(controller.inputs[0][28].v, 0, 127, 100, 1500);
  let density = map(controller.inputs[0][27].v, 0, 127, 0.5, 5);
  let thickness = map(controller.inputs[0][34].v, 0, 127, 0.5, 5);
  let outerRim = rimSlider.value();
  let effect = map(controller.inputs[0][29].v, 0, 127, 1, 360);
  let thresh = threshSlider.value();
  let alpha = controller.inputs[0][34].v / 127 * 0.9 + 0.1;
  let corners = map(controller.inputs[0][32].v, 0, 127, 0, 50);
  area = map(controller.inputs[0][35].v, 0, 127, 0.5, 3);


  //beams
  strokeWeight(thickness);
  noFill();
  //fill('rgba(178, 166, 255, 0.01)');
  //stroke('rgba(160, 149, 230, 1)');
  stroke('rgba(178, 166, 255, 0.3)');
  //stroke('rgba(58, 253, 8, 0.3)');

  let spectrum = fft.analyze();
  peakDetect.update(fft);
  
  // if (peakDetect.isDetected) {
  //   stroke('#6C5880');
  // } else {
  //   stroke('rgba(178, 166, 255, 0.3)');
  // }
  
  
  translate(sketchWidth / 2, sketchHeight / 2);
  rotate(Math.PI / 180 * flip);
   //top half
   beginShape();
   for(let angle = 0; angle < 360; angle += density) {
    
    const radius = area * spectrum[Math.round(angle / 500 * detail)];
    //const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
    const iradius = area * spectrum[Math.round(angle/mult*detail+ribbon)]

       const x = radius * cos(Math.PI / -effect * angle);
       const y = radius * sin(Math.PI / -effect * angle);

       const ix = iradius * cos(Math.PI / -effect * angle);
       const iy = iradius * sin(Math.PI / -effect * angle);


    if (vistype === 'verts') {
      curveVertex(x,y,ix,iy);
    } else if (vistype === 'points') {
      point(x,y,ix,iy);
    } else if (vistype === 'circs') {
      circle(x,y,ix,iy);
    } else if (vistype ===  'ellips') {
      ellipse(x,y,ix,iy);
    } else if (vistype === 'lines') {
      line(x,y,ix,iy);
    } else if (vistype === 'rects') {
      rect(x,y,ix,iy, corners);
    }

   }
   endShape();
  
   //bottom half
   beginShape();
   for(let angle = 0; angle < 360; angle += density) {
    
    const radius = area * spectrum[Math.round(angle / 500 * detail)];
    //const iradius = random(sketchWidth / 2 - (rimSize-rimFlutter),sketchHeight / 2 - rimSize);
    const iradius = area * spectrum[Math.round(angle/mult*detail+ribbon)]

       const x = radius * cos(Math.PI / -effect * -angle);
       const y = radius * sin(Math.PI / -effect * -angle);

       const ix = iradius * cos(Math.PI / -effect * -angle);
       const iy = iradius * sin(Math.PI / -effect * -angle);

       if (vistype === 'verts') {
        curveVertex(x,y,ix,iy);
      } else if (vistype === 'points') {
        point(x,y,ix,iy);
      } else if (vistype === 'circs') {
        circle(x,y,ix,iy);
      } else if (vistype ===  'ellips') {
        ellipse(x,y,ix,iy);
      } else if (vistype === 'lines') {
        line(x,y,ix,iy);
      } else if (vistype === 'rects') {
        rect(x,y,ix,iy, corners);
      }

   }
   endShape();




    
  //slidervalues  
  pMultVal.html(multSlider.value()); 
  pDetailVal.html(detailSlider.value()); 
  pDensityVal.html(densitySlider.value()); 
  pThickVal.html(thickSlider.value()); 
  pRimVal.html(rimSlider.value()); 
  pEffectVal.html(effectSlider.value()); 
  pTreshVal.html(threshSlider.value()); 
  //pLevel.html(ceil((level * 1000))+10);
  pLevel.html(ceil(map(level, 0, 1, 0, 99)));
  }
}

  
  //  let log = spectrum;
  //  fill()
  //  textSize(10);
  //  text(log, sketchWidth/sketchWidth, sketchHeight-(sketchHeight-10))
   
  

   