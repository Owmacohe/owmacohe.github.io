var answers = [
  "answerA"
];

function setup() {
  document.getElementById("main_title").innerHTML = document.title;
  document.getElementById("sub_title").innerHTML = "Room " + document.title[0];
  document.getElementById("submitField").value = "";

  var dots = document.getElementsByClassName("dot");

  for (var i = 0; i < dots.length; i++) {
    for (var j = 0; j < 45; j++) {
      dots[i].innerHTML += ".";
    }
  }
}

var sliding = false;
var slideValue = 2;
var maxSlide = 4;

function slide() {
  var input = document.getElementById("submitField");

  if (input.value == answers[document.title[0].charCodeAt(0) - 65]) {
    showResult(true);
    sliding = true;
  }
  else {
    input.value = "";
    showResult(false);
  }
}

function showResult(isCorrect) {
  var result = document.getElementById("result")
  result.style.visibility = "visible";

  if (isCorrect) {
    result.innerHTML = "Correct response!";
    result.style.color = "#4b6c2b";
  }
  else {
    result.innerHTML = "Incorrect response. Please try again.";
    result.style.color = "#6c2b2b";
  }
}

var slideCount = setInterval(function() {
  var button = document.getElementById("submitButton");

  if (sliding == true && slideValue < maxSlide) {
    slideValue += Math.exp(-slideValue);
    button.style.marginLeft = slideValue + "vw";
  }

  if (slideValue >= maxSlide) {
    window.location.href = String.fromCharCode(document.title[0].charCodeAt(0) + 1) + ".html";
    clearInterval(slideCount);
  }
}, 1);
