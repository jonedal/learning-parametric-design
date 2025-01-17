
//let density = 'Ñ@#W$9876543210?!abc;:+=-,._                    ';
//let density = '                    _.,-=+:;cba!?0123456789$W#@Ñ';
//let density = '       .:-i|=+%O#@';
let density = '@#O%+=|i-:.       ';
//let density = '        .:░▒▓█';
//let density = '█▓▒░:.        ';

let video;
let asciiDiv;

function setup() {
  //createCanvas(60, 42);
  noCanvas();
  video = createCapture(VIDEO);
  video.size(180, 70);
  video.position(500,335);
  video.hide();
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);

  
}
