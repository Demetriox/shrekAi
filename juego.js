let video;
// For displaying the label
let label = "waiting...";
let fiona = new Audio(src="audios/fiona.mp3");
let pajarito = new Audio(src="audios/pajarito.mp3")


// The classifier
let classifier;
 let modelURL = 'https://storage.googleapis.com/tm-models/YadBJmj5/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier('./ai_stuff/model.json');
}


function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0);

  // PONE EL TEXTO DENTRO DEL VIDEO
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  // Pick an emoji, the "default" is train
  let emoji = "Cargando";
  if (label == "Class 2") {
    emoji = "Pajarito Canta";
    fiona.pause();
    pajarito.play();
  } else if (label == "fiona") {
    emoji = "Fiona Canta";
    pajarito.pause();
    fiona.play();
  } 
  // Draw the emoji
  textSize(40);
  text(emoji, width / 2, height / 2);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }

  console.log(label);
  // Store the label and classify again!\
    label = results[0].label;
  classifyVideo();
}