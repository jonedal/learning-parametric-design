function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('#625075');

  //Point(200,200);

  stroke('white');
  strokeWeight(1);
  fill('rgba(0,0,0,0)')
  
  //kreise
  
  circle(200, 220, 280);
  
  circle(200, 220, 50);
  //fill('rgba(100,100,100,0.5)')
  circle(200, 220, 100);

      //arm
      rect(340, 305, 30, 50, 5);
      line(350,320,350,280)
      line(360,320,360,280)

      arc(
        355, 320,
        10, 10,
        Math.PI / 180 * 0,
        Math.PI / 180 * 180,
        OPEN
      );

      arc(
        345, 280,
        10, 15,
        Math.PI / 180 * 300,
        Math.PI / 180 * 0,
        OPEN
      );

      arc(
        355, 280,
        10, 20,
        Math.PI / 180 * 290,
        Math.PI / 180 * 0,
        OPEN
      );

      line(358,272,300,200)
      line(348,274,288,201)

      arc(
        294, 201,
        12.5, 20,
        Math.PI / 180 * 180,
        Math.PI / 180 * 0,
        CHORD
      );

      rect(30, 315, 30, 40, 2);  
      rect(30, 70, 30, 80, 2);
      line(45,80,45,139)
      rect(40,90,10,12,1)
  
  //diagonalen
  line(180,266,140,346)
  line(220,174,262,95)

  line(220,266,260,346)
  line(180,174,140,94)


  //top bar
        line(50,20,350,20)
        line(50,40,350,40)

        //linker Bogen
        arc(
          50, 30,
          20, 20,
          Math.PI / 180 * 90,
          Math.PI / 120 * 180,
          OPEN
        );

        //rechter Bogen
        arc(
          350, 30,
          20, 20,
          Math.PI / 120 * 180,
          Math.PI / 180 * 90,
          
          OPEN
        );

        //drei kreise oben
        fill('#F56A63')
        circle(350,30,20)
        fill('#F5DF7A')
        circle(330,30,20)
        fill('#5CF588')
        circle(310,30,20)

        line(120,20,120,40)

        

      }