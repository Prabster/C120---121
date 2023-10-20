previous_result = "";

function setup() {
  canvas = createCanvas(400, 300);
  canvas.position(740, 400);
  background("white");
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function draw() {
  image(video, 0, 0, 400, 300);
  classifier.classify(video, gotResult);
}

function modelLoaded() {
  console.log("Your Model Is Loaded");
}

function gotResult(error, result) {
  if (error) {
    console.error("error");
  }
  else {
    if (result[0].confidence > 0.5 && previous_result != result[0].label) {
      console.log(result);
      previous_result = result[0].label;
      document.getElementById("object").innerHTML = result[0].label;
      document.getElementById("accuracy").innerHTML = Math.floor(result[0].confidence * 100) + "%";
      // synth = window.speechSynthesis;
      // speak_data = "The Object Detected Is" +  result[0].label;
      // utterThis = new SpeechSynthesisUtterance(speeak_data);
      // synth.speak(utterThis);
    }
  }
}