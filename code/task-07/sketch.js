
let sketchWidth = 1440;
let sketchHeight = 720;

var circles = [];

function setup() {
  createCanvas(sketchWidth, sketchHeight);

  // Lets make sure we don't get stuck in infinite loop
  
} 

var protection = 0;
function draw() {
 

  // Try to get to 500
  while (circles.length < 500) {
    // Pick a random circle
    var dot = {
      x: random(width),
      y: random(height),
      r: random(6, 36)
    };

    // Does it overlap any previous circles?
    var overlapping = false;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      var d = dist(dot.x, dot.y, other.x, other.y);
      if (d < dot.r + other.r) {
        overlapping = true;
      }
    }

    // If not keep it!
    if (!overlapping) {
      circles.push(dot);
    }

    // Are we stuck?
    protection++;
    if (protection > 10000) {
      break;
    }
  }

  fill (100)
  // Draw all the circles
  for (var i = 0; i < circles.length; i++) {
    //fill(255, 0, 175, 100);
    noStroke();
    ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
  }
}
