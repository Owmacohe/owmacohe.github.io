/* Spinning & rainbow */

var cassette;
var guitar;
var kuromi;
var mychem;
var opossum;
var rabbit;

var speed;
var degrees = 0;

var colourNum = 0;
var countNum = 0;

var spinCall = setInterval(function() {
  cassette = document.getElementById("cass");
  guitar = document.getElementById("guit");
  kuromi = document.getElementById("kuro");
  mychem = document.getElementById("mcr");
  opossum = document.getElementById("opos");
  rabbit = document.getElementById("rabb");

  spin(cassette);
  spin(guitar);
  spin(kuromi);
  spin(mychem);
  spin(opossum);
  spin(rabbit);

  colourNum += 15;

  if (colourNum > 345) {
    colourNum = 0;
  }

  document.getElementById("rainbow").style.color = "hsl("+colourNum+", 100%, 50%)";

  countNum++;

  if (countNum >= 50) {
    rainbowOn = false;
    countNum = 0;
  }
}, 50);

function spin(image) {
  degrees += 3;

  image.style.transform = "rotate("+degrees+"deg)";
}

/* Dancers */

var dancer1;
var dancer2;
var dancer3;
var dancer4;

var poses1 = ["(ง ͡ ͡° ͜ ʖ ͡ ͡°)ว", "ว(°͡ ͡ ʖ ͜ °͡ ͡ ง)"];
var poses2 = ["(ヘ◕。◕)ヘ", "ヘ(◕。◕ヘ)"];
var poses3 = ["┏( ・o･)┛", "┗(･o･ )┓"];
var poses4 = ["(ノ^_^)ノ", "ノ( ^_^ノ)"];

var poseSwitch = false;

var danceCall = setInterval(function() {
  dancer1 = document.getElementById("dan1");
  dancer2 = document.getElementById("dan2");
  dancer3 = document.getElementById("dan3");
  dancer4 = document.getElementById("dan4");

  dance(dancer1, poses1);
  dance(dancer2, poses2);
  dance(dancer3, poses3);
  dance(dancer4, poses4);

  if (poseSwitch == false) {
    poseSwitch = true;
  }
  else if (poseSwitch == true) {
    poseSwitch = false;
  }
}, 400);

function dance(dancer, poses) {
  if (poseSwitch == false) {
    dancer.innerHTML = poses[1];
  }
  else if (poseSwitch == true) {
    dancer.innerHTML = poses[0];
  }
}
