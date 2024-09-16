// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;

// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/X7wbXVogs/';

// Video
let video;

// To store the classification
let label = "Waiting for the TM model...";

//No one likes Comic Sans
let currentFont = 'Comic Sans MS'; // Set Comic Sans as the initial font
let displayString = "No one likes Comic Sans, let's change it!"; // Initial string



// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(600, 600);
  //create the video
  video = createCapture(VIDEO, { flipped: true });
  video.size(320,260);
  video.hide();

  // Start classifying
  classifier.classifyStart(video, gotResult);
}

function draw() {
  background(0, 0, 139); // Dark blue background color (RGB)

  // Calculate the position to center the video
  let videoX = (width - video.width) / 2;
  let videoY = (height - video.height) / 2;

  // Draw the video at the calculated center position
  image(video, videoX, videoY);

  // Set the font and string based on the detected label
  if (label === "Serif") {
    currentFont = 'Times New Roman'; // Change to Times New Roman for Serif
    displayString = "Ah, a classic choice."; // Display this string for Serif
  } else if (label === "Sans Serif") {
    currentFont = 'Helvetica'; // Change to Helvetica for Sans Serif
    displayString = "Phew, thank god for Helvetica"; // Display this string for Sans Serif
  } else if (label === "Classify Again") {
    // Do not change the currentFont or displayString when label is 'Classify Again'
    // Leave it as it is
  }


  // Set the font for the text
  textFont(currentFont);

  // Draw the classification label below the video
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, width / 2, videoY + video.height + 40); // Positioned 40px below the video

  // Draw the display string below the classification label
  textSize(24);
  text(displayString, width / 2, videoY + video.height + 80); // Positioned 80px below the video
  
}

// Get a prediction for the current video frame
function classifyVideo() {
  //flippedVideo = ml5.flipImage(video)
  classifier.classifyStart(video, gotResult);
}

// When we get a result
function gotResult(results) {
  // The results are in an array ordered by confidence.
  //console.log(results[0]);
  label = results[0].label;
}