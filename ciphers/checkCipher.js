var answerSets = [
  {
      "name": "Album",
      "question": "What am I miss_ng?",
      "answer": "i"
  },
  {
      "name": "Brochure",
      "question": "Greater than a colon, closing with a parent(heses)",
      "answer": ">:)"
  },
  {
      "name": "Codex",
      "question": "Sgd bzohszk ne Mdv Ydzkzmc",
      "answer": "Wellington" /* ### "The capital of New Zealand" ### */
  },
  {
      "name": "Dictionary",
      "question": "01101111 01101101 01100011 01101000 00101110 01110100 01100101 01100011 01101000 00101111 01100011 01101001 01110000 01101000 01100101 01110010 01110011 00101111 01110010 01100101 01101101 01101111 01110110 01100101 01110010 00101101 01101111 01100110 00101101 01101111 01100010 01110011 01110100 01100001 01100011 01101100 01100101 01110011 00101110 01101000 01110100 01101101 01101100",
      "answer": "4" /* ### "omch.tech/ciphers/remover-of-obstacles.html" > "How many arms does Ganesha usually have?" ### */
  },
  {
      "name": "Essay",
      "question": "<img src='checkerboard.png' style='width: 35vw; margin-bottom: 2vw;'>.-.. --..-- ..- --..-- ..- --..-- .-. --..-- -.. --..-- .-. --..-- .-. --..-- ..- --..-- ..- --..-- .-..",
      "answer": "Write" /* ### "L,U,U,R,D,R,R,U,U,L" ### */
  },
  {
      "name": "Folio",
      "question": "<div>SSB0b29rIHRoZSBvbmUgbGVzcyB0cmF2ZWxlZCBieQ==</div><div>QW5kIHRoYXQgaGFzIG1hZGUgYWxsIHRoZSBfX18=</div><div style='margin-top: 2vw;'>Kwb tpu mf vlh wqiijx fjeus ts vvgbth?</div>",
      "answer": "512" /* ### "I took the one less traveled by / And that has made all the ___" > "difference" >  "How old is the oldest shark on record?" ### */
  },
  {
      "name": "Grimoire",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Hardcover",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Index",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Journal",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Keynote",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Lexicon",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Manual",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Novel",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Omnibus",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Paperback",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Quarto",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Reprint",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Scroll",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Tome",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "U",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Vade Mecum",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "W",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Xylograph",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Y",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "name": "Zine",
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
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
    for (var k = 0; k < 35; k++) {
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

    if (Math.floor(Math.random() * 20) == 0) {
      one_dot.style.color = "#b0ff64";
    }
  }
}, 50);

function slide() {
  var input = document.getElementById("submitField");

  if (input.value.toLowerCase() == answerSets[document.title[0].charCodeAt(0) - 65].answer.toLowerCase()) {
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
      document.title = answerSets[document.title[0].charCodeAt(0) - 64].name;
      setup();
      clearInterval(slideCount);
    }
  }, 1);
}
