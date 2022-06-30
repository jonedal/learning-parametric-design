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
		alert("No MIDI support present in your browser.  This is going to be boring.")

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
		alert("No MIDI input devices present.  This is going to be boring.");
    
	}
}
initD3();

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
	alert("The MIDI system failed to start.  This is going to be boring.");
}

function MIDIMessageEventHandler(event) {
	console.log(event.data);
	if(init){
		var id = controller_ids[event.data[0]+"_"+event.data[1]];

		controller.inputs[id.s][id.i].v = event.data[2];

  /*---------- UPDATE INPUTS ----------*/
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
	}
}

}
function flipVisuals() {
  flip *= -1;
}

const sketchWidth = 1439;
const sketchHeight = 860;
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
  if (init == true) {
  //loudness
  let level = audio.getLevel(); 
  
  noStroke(); 
  const size = 8;
  let hue = map(controller.inputs[0][24].v, 0, 127, 255, 0);
  let sat = map(controller.inputs[0][25].v, 0, 127, 50, 255);
  let bright = map(controller.inputs[0][26].v, 0, 127, 70, 20);

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
  

  let mult = 470 //multSlider.value();
  let detail = map(controller.inputs[0][28].v, 0, 127, 10, 2000);
  let density = map(controller.inputs[0][27].v, 0, 127, 0.1, 5);
  let thickness = map(controller.inputs[0][34].v, 0, 127, 0.5, 5);
  let effect = map(controller.inputs[0][29].v, 0, 127, 1, 360);
  let alpha = controller.inputs[0][33].v / 127 * 175 + 80;
  let corners = map(controller.inputs[0][32].v, 0, 127, 0, 50);
  area = map(controller.inputs[0][35].v, 0, 127, 0.5, 5);


  colorMode(RGB);
  //beams
  strokeWeight(thickness);
  noFill();
  stroke(178, 166, 255, alpha);
  
  let spectrum = fft.analyze();
  
  // translate(sketchWidth / 2, sketchHeight / 2);
  // for (let n = 0; n < 360; n += 1) {
  //   if (n === 360) {n - 360};
  //   let rotation = n + map(controller.inputs[0][18].v, 0, 127, 270, 630);
  //   angleMode(DEGREES);
  //   rotate(rotation);
  // }
  
  translate(sketchWidth / 2, sketchHeight / 2);
  let rotation = map(controller.inputs[0][18].v, 0, 127, 270, 630);
  
    if (controller.inputs[0][16].v === 127) {
      rotation *= -1;
    }
  
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
    const iradius = area * spectrum[Math.round(angle / mult * detail + ribbon)]

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
  pDetailVal.html(round(map(controller.inputs[0][28].v, 0, 127, 1, 100))); 
  pDensityVal.html(round(map(controller.inputs[0][27].v, 0, 127, 1, 100)),); 
  pThickVal.html(round(map(controller.inputs[0][34].v, 0, 127, 0.5, 5))); 
  pEffectVal.html(round(map(controller.inputs[0][29].v, 0, 127, 1, 360))); 
  pTreshVal.html(threshSlider.value()); 
  pLevel.html(ceil(map(level, 0, 1, 0, 99)));
  }
}
   