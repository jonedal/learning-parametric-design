const sketchWidth = 600;
const sketchHeight = 400;

const x1 = 200;
const y1 = (sketchHeight / 2);
const x2 = 300;
const y2 = y1;
const x3 = 400;
const y3 = y1;



const one = [
  'TH',
  'O',
  'RSTEN'
]

const two = [
  'SCH',
  'Ä',
  'FER'
]

const three = [
  'G',
  'Ü',
  'MBEL',
]

function setup() {
  createCanvas(sketchWidth, sketchHeight);
  frameRate(50)
}
  
function draw() {
  const rand = random(0,2);
  background(60);
  
  textSize(15);
  textFont('Arial');
  fill(220);
  
  text('1.', x1, y1 - 50);
  text('2.', x2, y2 - 50);
  text('3.', x3, y3 - 50);

  text(one[0], x1, y1);
  text(one[1], x1 + 21, y1);
  text(one[2], x1 + 33, y1);

  text(two[0], x2, y2);
  text(two[1], x2 + 32, y2);
  text(two[2], x2 + 42, y2);

  text(three[0], x3, y3);
  text(three[1], x3 + 11, y3);
  text(three[2], x3 + 22, y3);

  text(one[2], x1, y1 + 50);


  
}
