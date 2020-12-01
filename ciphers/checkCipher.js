var answerSets = [
  {
      "name": "Album",
      "question": "What am I miss_ng?",
      "answer": "i"
  },
  {
      "name": "Brochure",
      "question": "Sgd bzohszk ne Mdv Ydzkzmc",
      "answer": "Wellington"
  },
  {
      "name": "Codex",
      "question": "[room under construction]",
      "answer": "TODO"
  }
];

var sliding;
var slideValue;
var maxSlide = 4.5;

function setup() {
  sliding = false;
  slideValue = 2;
  document.getElementById("submitButton").style.marginLeft = "2vw";
  document.getElementById("result").style.visibility = "hidden";

  document.getElementById("main_title").innerHTML = document.title;
  document.getElementById("sub_title").innerHTML = "Room " + document.title[0];
  document.getElementById("submitField").value = "";
  document.getElementById("box").innerHTML = answerSets[document.title[0].charCodeAt(0) - 65].question;

  var dots = document.getElementsByClassName("dots");

  for (var i = 0; i < dots.length; i++) {
    dots[i].innerHTML = "";
  }

  for (var j = 0; j < dots.length; j++) {
    for (var k = 0; k < 40; k++) {
      dots[j].innerHTML += ".";
    }
  }
}

var dotsCount = 100;
var dotsOpacity = 60;

var dotCount = setInterval(function() {
  for (var i = 0; i < document.getElementsByClassName("one_dots").length; i++) {
    document.getElementsByClassName("one_dots")[i].remove();
  }

  for (var j = 0; j < dotsCount; j++) {
    var one_dot = document.createElement("DIV");
    document.body.appendChild(one_dot);
    one_dot.setAttribute("class", "one_dots");
    one_dot.setAttribute("style", "position: absolute; z-index: -1; left: " + Math.floor(Math.random() * 99) + "vw;" + " top: " + Math.floor(Math.random() * 54) + "vw;" + " opacity: " + Math.floor(Math.random() * dotsOpacity) + "%;");
    one_dot.innerHTML = ".";
  }
}, 50);

function slide() {
  var input = document.getElementById("submitField");

  if (input.value == answerSets[document.title[0].charCodeAt(0) - 65].answer) {
    showResult(true);
    sliding = true;
  }
  else {
    if (event.keyCode == 13 || event == null) {
      input.value = "";
      showResult(false);
    }
  }
}

function showResult(isCorrect) {
  var result = document.getElementById("result");
  result.style.visibility = "visible";

  if (isCorrect) {
    result.innerHTML = "Correct response!";
    result.style.color = "#4b6c2b";
  }
  else {
    result.innerHTML = "Incorrect response. Please try again.";
    result.style.color = "#6c2b2b";
  }

  var slideCount = setInterval(function() {
    var button = document.getElementById("submitButton");

    if (sliding == true && slideValue < maxSlide) {
      slideValue += Math.exp(-slideValue);
      button.style.marginLeft = slideValue + "vw";
    }

    if (slideValue >= maxSlide) {
      //window.location.href = String.fromCharCode(document.title[0].charCodeAt(0) + 1) + ".html";
      document.title = answerSets[document.title[0].charCodeAt(0) - 64].name;
      setup();
      clearInterval(slideCount);
    }
  }, 1);
}
