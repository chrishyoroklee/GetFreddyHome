let osc1;
let osc2;
let osc3;
let osc4;
let osc5;
let osc6;
let osc7;
let osc8;
let x1Pos = 0
let y1Pos = 300
let positionX = 50;
let positionY = 50;
let positionX1 = 680;
let positionY1 = 700;
let speed = 10;
let xSpeed1 = 5
let ySpeed1 = 5
let dist1;
let dist2;
let showInstructions = true;
let song;

function setup() {
  createCanvas(800, 800);
  mainCharacter = loadImage('Freddy.png');
  prize = loadImage('house.png');
  song = loadSound('JingleBells.wav');
  fireball = loadImage('fireball.png');
  // setting oscillators
  osc1 = new p5.Oscillator();
  osc1.setType('sawtooth'); 
  osc1.freq(440); //(440 Hz = A4)
  osc1.amp(0.4);
  
  osc2 = new p5.Oscillator();
  osc2.setType('sine')
  osc2.freq(415); // (415 Hz = G#/Ab4)
  osc2.amp(0.4); 
  
  osc3 = new p5.Oscillator();
  osc3.setType('sine')
  osc3.freq(392); // (392 Hz = G4)
  osc3.amp(0.4);
  
  osc4 = new p5.Oscillator();
  osc4.setType('sine')
  osc4.freq(554.37); // (554.37 Hz = C#/Db4)
  osc4.amp(0.4);
  
}




function draw() {
  background(255, 255, 255);
  //Main Character
  image(mainCharacter, positionX, positionY, width/12, width/7.5)
  // fill(0, 0, 255);
  // rect(positionX, positionY, 30);
  // noFill();
  //right arrow
  if (keyIsDown(RIGHT_ARROW)) {
    positionX = positionX + speed;
    osc1.start();
  }
  else{
    osc1.stop()
  }
  //left arrow
  if (keyIsDown(LEFT_ARROW)) {
    positionX = positionX - speed;
    osc2.start();
  } else{
    osc2.stop()
  }
  //up arrow
  if (keyIsDown(UP_ARROW)) {
    positionY = positionY - speed;
    osc3.start();
  } else{
    osc3.stop()
  }
  
  //down arrow
  if (keyIsDown(DOWN_ARROW)) {
    positionY = positionY + speed;
    osc4.start();
  }else{
    osc4.stop();
  }
  
  //Maze function
  maze()
  //Distance between the ball and Freddy
  fireDist = dist(x1Pos, y1Pos, positionX, positionY)
  //Conditionals for main character colliding into walls
  if (
    //wall1
    (positionX >= width / 10 &&
      positionX <= width / 10 + width / 10 &&
      positionY >= width / 15 &&
      positionY <= width / 15 + width / 0.8) ||
    //wall2
      (positionX >= width / 3.75 &&
      positionX <= width / 3.75 + width/ 10 &&
      positionY >= 0 &&
      positionY <= width / 1.22)||
    //wall3
    (positionX >= width / 2.307 &&
      positionX <= width / 2.307 + width / 10 &&
      positionY >= width / 12 &&
      positionY <= width / 12 + width / 0.8) ||
    //Wall4
      (positionX >= width/ 1.54 &&
      positionX <= width / 1.54 + width / 10 &&
      positionY >= 0 &&
      positionY <= 0 + width / 1.463||
    //out of bounds
    positionX <= 0 ||
    positionX >= width ||
    positionY <= 0 ||
    positionY >= width) ||
    //If the ball touches Freddy, Freddy dies
    (fireDist < 70)
   ) {
    background(255, 255, 255)
    fill(255, 0, 0)
    textSize(80);
    text("FREDDY DIED!", 30, 250);
    noFill()
    anxietyMusiq() 
    //Fireball stops when it hits target
    xSpeed1 = 0;
    ySpeed1 = 0;
  }
  //Making the ball of fire
   x1Pos += xSpeed1;
   y1Pos += ySpeed1;
  fill(255, 0, 0)
  image(fireball, x1Pos, y1Pos, width/8, width/6)
  //Making sure the balls stay within the map
  if (x1Pos>width/1.0909 || x1Pos <0) {
    fill(0, 255, 0)
    xSpeed1 *= -1
  }
  if (y1Pos>width/1.0909  || y1Pos <0) {
    ySpeed1 *=-1 } 
      
  //Making the "prize"
  image(prize, positionX1, positionY1, width/7.5, width/7.5)
  
  //Adding "You Win!" when it reaches the prize
  //Distance between the ball and the main character
  let dist1 = dist(positionX, positionY, positionX1, positionY1)
  if (dist1 < 50){
    background(255, 255, 255);
    fill(0, 0, 255);
    textSize(55);
    text("FREDDY WENT HOME", width/40, width/2.1428);
    noFill();
    //Play the ending theme
    song.setVolume(0.5);
    song.play();
  }else{
    song.stop()
  }
  instructions()
}
function instructions() {
  
   
    if (showInstructions) {
       background(255, 255, 255)
        fill(0, 0, 0);
        textSize(width/20);
        text("Our friend Freddy really wants", width/20, width/6)
      text("to get home... ;(", width/20, width/4)
        textSize(width/12);
        text("Use The Arrow Keys ", width/40, width/2.4);
        text("To Get Freddy Home ", width/40, width/2);
        textSize(width/18);
        text("PRESS SPACE BAR TO START ",width/25,width/1.5);
        text("PRESS ESC TO RESTART GAME",width/25,width/1.2);
        noFill();
    }
}
function keyPressed() {
  if (keyCode === 32){
    showInstructions = false;
  }else if (keyCode === ESCAPE) {
    restartGame();
  }
}
function maze(){
   //Making The Maze
   //Wall 1
  fill(150, 0, 0);
  rect(width / 6, width / 5, width / 18, width / 0.8);
  noFill();
  //Wall 2
  fill(150, 0, 0);
  rect(width/3, 0, width*0.05, width/1.2);
  noFill();
  //Wall 3
  fill(150, 0, 0);
  rect(width / 2, width / 5, width / 18, width / 0.8);
  noFill();
  //Wall 4
  fill(150, 0, 0);
  rect(width/1.4, 0, width*0.05, width/1.4);
  noFill();
}
//When character dies
function anxietyMusiq(){
  osc1.start()
  osc2.start()
  osc3.start()
  osc4.start()
}
//Game restart method
function restartGame() {
  positionX = 50;
  positionY = 50;
  x1Pos = 0;
  y1Pos = 300;
  xSpeed1 = 5;
  ySpeed1 = 5;
  showInstructions = true;
  // Reset any other variables or game state as needed
}
