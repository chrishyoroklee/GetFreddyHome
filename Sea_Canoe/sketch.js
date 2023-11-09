let vid;
let playing = true;
let xPos = 50;
let yPos = 100;
let videoLoaded = false;
let showInstructions = true;

function setup() {
  createCanvas(1000, 800);
  vid = createVideo("JavascriptVideo.mp4");
  vid.size(1000, 800);
  vid.volume(0);
  vid.hide();

  // Event listener for the video element's loadeddata event
  vid.elt.addEventListener('loadeddata', function() {
    videoLoaded = true;
    vid.elt.addEventListener('ended', loopVideo);
  });
  
}

function draw() {
  background(255);
  
  if (videoLoaded) {
    image(vid, 0, 0, width, height);
    vid.loadPixels(); // Load pixel data for the video frame
    
    let darkestColor = 1000;
    let darkestX = 0;
    let darkestY = 0;
  
    drawBrightestPixels();
    // Loop through every pixel in the video frame
    for (let y = 0; y < vid.height; y++) {
      for (let x = 0; x < vid.width; x++) {
        let index = (x + y * vid.width) * 4;
        let r = vid.pixels[index];
        let g = vid.pixels[index + 1];
        let b = vid.pixels[index + 2];
        let currentBrightness = r + g + b;

        // Check if the current pixel is darker than the previous darkest pixel
        if (currentBrightness < darkestColor) {
          darkestColor = currentBrightness;
          darkestX = x;
          darkestY = y;
        }
      }
    }
    
    fill(255, 255, 255, 0.5);
    ellipse(darkestX, darkestY, 20, 20); // Draw an ellipse at the darkest pixel's position
  }
  instructions()
  pixelFilter()
  
}
function pixelFilter(){
    for(let x = 0; x < 400; x++){
    for(let y = 0; y < 40; y ++){
      let currentColor = get(x * 80, y * 40)
      noStroke()
      fill(currentColor)
      rect(x * 80, y * 40, 15)
    
  }
}
}
function drawBrightestPixels() {
  vid.loadPixels();
  noStroke();
  for (let y = 0; y < vid.height; y++) {
    let brightestColor = 0;
    let brightestX = 0;
    for (let x = 0; x < vid.width; x++) {
      let index = (x + y * vid.width) * 4;
      let r = vid.pixels[index];
      let g = vid.pixels[index + 1];
      let b = vid.pixels[index + 2];
      let currentBrightness = r + g + b;

      // Check if the current pixel is brighter than the previous brightest pixel in this row
      if (currentBrightness > brightestColor) {
        brightestColor = currentBrightness;
        brightestX = x;
      }
    }
    // Draw a shape (ellipse in this case) at the position of the brightest pixel in this row
    fill(204, 255, 255, 10); // Red semi-transparent fill color
    ellipse(brightestX, y, 30, 30); // Draw ellipse at the brightest pixel's position
  }
}
function mousePressed() {
  if (playing) {
    vid.pause();
  } else {
    vid.play();
    showInstructions = false;
  }
  playing = !playing;
}
function loopVideo() {
  vid.play();
  vid.time(0); 
}
const instructions = () => {
  
   
    if (showInstructions) {
       background(255, 255, 255, 10)
        fill(0, 0, 0);
      
        textSize(width/22);
        text("Click to start video", width/25, width/2);
        
      
        noFill();
    }
}

