var roomNames = [
  "Album",
  "Brochure",
  "Codex",
  "Dictionary",
  "Essay",
  "Folio",
  "Grimoire",
  "Hardcover",
  "Index",
  "Journal",
  "Keynote",
  "Lexicon",
  "Manual",
  "Novel",
  "Omnibus",
  "Paperback",
  "Quarto",
  "Reprint",
  "Scroll",
  "Tome",
  "U",
  "Vade Mecum",
  "W",
  "Xylograph",
  "Y",
  "Zine"
]

var answerSets = [
  {
      "question": "What am I miss_ng?",
      "answer": "i"
  },
  {
      "question": "Greater than a colon, closing with a parent(heses)",
      "answer": ">:)"
  },
  {
      "question": "Sgd bzohszk ne Mdv Ydzkzmc",
      "answer": "Wellington" /* ### "The capital of New Zealand" ### */
  },
  {
      "question": "The world population was __________ in the year MCMXXVII",
      "answer": "2000000000" /* ### 1927 ### */
  },
  {
      "question": "01101111 01101101 01100011 01101000 00101110 01110100 01100101 01100011 01101000 00101111 01100011 01101001 01110000 01101000 01100101 01110010 01110011 00101111 01110010 01100101 01101101 01101111 01110110 01100101 01110010 00101101 01101111 01100110 00101101 01101111 01100010 01110011 01110100 01100001 01100011 01101100 01100101 01110011 00101110 01101000 01110100 01101101 01101100",
      "answer": "4" /* ### "omch.tech/ciphers/remover-of-obstacles.html" > "How many arms does Ganesha usually have?" ### */
  },
  {
      "question": "<img src='checkerboard.png' style='width: 35vw; margin-bottom: 2vw;' onload='setHeight()'>.-.. --..-- ..- --..-- ..- --..-- .-. --..-- -.. --..-- .-. --..-- .-. --..-- ..- --..-- ..- --..-- .-..",
      "answer": "Write" /* ### "L,U,U,R,D,R,R,U,U,L" ### */
  },
  {
      "question": "<div class='flexrow'><div class='flexcolumn' style='align-items: flex-end;'><div class='binary_column' style='margin-top: 1vw;'>01100011 01101000 01100101 01100100 01100100 01100001 01110010</div><div class='binary_column'>01110011 01110100 01101001 01101100 01110100 01101111 01101110</div><div class='binary_column'>01110111 01100101 01101110 01110011 01101100 01100101 01111001 01100100 01100001 01101100 01100101</div><div class='binary_column'>01100010 01110010 01101001 01100101</div><div class='binary_column'>01110011 01110111 01101001 01110011 01110011</div><div class='binary_column'>01101101 01101111 01111010 01111010 01100001 01110010 01100101 01101100 01101100 01100001</div><div class='binary_column'>01100110 01100101 01110100 01100001</div><div class='binary_column'>01100111 01101111 01110101 01100100 01100001</div><div class='binary_column'>01110000 01100001 01110010 01101101 01101001 01100111 01101001 01100001 01101110 01100001</div><div class='binary_column'>01110000 01110010 01101111 01110110 01101111 01101100 01101111 01101110 01100101</div></div><div class='flexrow_wrap' style='width: 1vw; margin-left: 1vw; margin-right: 2vw;'><div class='period_column' style='margin-top: -0.5vw'>.</div><div class='period_column'>.</div><div class='period_column'>.</div><div class='period_column'>.</div><div class='period_column'>.</div><div class='period_column'>.</div><div class='period_column'>.</div><div class='period_column'>.</div><div class='period_column'>.</div><div class='period_column'>.</div></div><div style='align-items: left;'><div style='width: 25vw;'>01101110 01101111 01101110 01101111 01101110 01101111 01101110 01101111 01101110 01101111 01101110 01101111</div><div style='width: 30vw;'>01111001 01100101 01110011</div><div style='width: 25vw;'>01101110 01101111 01101110 01101111 01101110 01101111</div></div></div><div style='margin-top: 3vw;'>Country of origin of ____?</div>",
      "answer": "Greece" /* ### yes > feta ### */
  },
  {
      "question": "<div class='flexcolumn'><div class='pigpen_text'>WHOS ON FIRST</div><div style='margin-top: 3vw;'>omch.tech/ciphers/______-and-________.html</div></div>",
      "answer": "I don't know" /* ### "WHOS ON FIRST" > "IF I AM ON FIRST BASE AND I MOVE FORWARD TWO BASES WHAT IS MY NAME" ### */
  },
  {
      "question": "<div>SSB0b29rIHRoZSBvbmUgbGVzcyB0cmF2ZWxlZCBieQ==</div><div>QW5kIHRoYXQgaGFzIG1hZGUgYWxsIHRoZSBfX18=</div><div style='margin-top: 2vw;'>Kwb tpu mf vlh wqiijx fjeus ts vvgbth?</div>",
      "answer": "512" /* ### "I took the one less traveled by / And that has made all the ___" > "difference" >  "How old is the oldest shark on record?" ### */
  },
  {
      "question": "<div class='flexrow_wrap'><div class='characters'>S C M A</div><div class='characters'>W H B L</div><div class='characters'>I N T P</div><div class='characters'>T U O H</div></div><div style='margin-top: 3vw;'>6 1 20 8 15 13 19</div><div style='margin-top: 3vw;'>Bhta we lme wlsbwxt hjsmf yrxuqt as tal kajqd?</div>",
      "answer": "Mariana" /* ### "switch numb to alph" > fathoms > "What is the deepest ocean trench in the world?" ### */
  },
  {
      "question": "<div style='margin-bottom: 2vw;'>Falling Lightly Yonder, Yesterday's Old Uncle, From Out Of Lost Space</div>omch.tech/ciphers/___-___-_____.html",
      "answer": "Gimli" /* ### fly you fools > luncheon > "Who won the kill count contest between Gimli and Legolas at the battle of Helm's Deep?" ### */
  },
  {
      "question": "<div class='flexrow_wrap'><img class='qrs' src='qr/qr1.png'><img class='qrs' src='qr/qr2.png'><img class='qrs' src='qr/qr3.png'><img class='qrs' src='qr/qr4.png'><img class='qrs' src='qr/qr5.png'><img class='qrs' src='qr/qr6.png'></div><div style='margin-top: 3vw;'>omch.tech/ciphers/answer1-answer2-answer3.html</div>",
      "answer": "Poaceae" /* ### earth > water > sugar > planet > "Plants root in the earth, pull up water, and absorb sugar through photosynthesis. What family of plant does grass belong to?" ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
      "question": "[room under construction]",
      "answer": "TODO" /* ###  ### */
  },
  {
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

  var dotLines = document.getElementsByClassName("dotLines");

  for (var i = 0; i < dotLines.length; i++) {
    dotLines[i].innerHTML = "";
  }

  for (var j = 0; j < dotLines.length; j++) {
    for (var k = 0; k < 35; k++) {
      dotLines[j].innerHTML += ".";
    }
  }

  var letterCode = document.title[0].charCodeAt(0) - 65;

  if (letterCode <= 9) { // A to J (10 letters)
    brightChance = 700;
  }
  else if (letterCode > 9 && letterCode <= 15) { // K to P (6 letters)
    brightChance = 100;
  }
  else if (letterCode > 15 && letterCode <= 19) { // Q to T (6 letters)
    brightChance = 30;
  }
  else if (letterCode > 19 && letterCode <= 24) { // U to Y (3 letters)
    brightChance = 3;
  }
  else if (letterCode > 24) { // Z (1 letter)
    brightChance = 0;
  }

  dotsCount = 200;
  dotsOpacity = 50;

  body = document.body, html = document.documentElement;
  setHeight();

  if (document.getElementsByClassName("pigpen_text") != null) {
    translatePigpen();
  }
}

function setHeight() {
  height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

var dotsCount;
var dotsOpacity;
var brightChance;

var body;
var height;

var dotCount = setInterval(function() {
  for (var i = 0; i < document.getElementsByClassName("one_dots").length; i++) {
    document.getElementsByClassName("one_dots")[i].remove();
  }

  for (var j = 0; j < dotsCount; j++) {
    var one_dot = document.createElement("DIV");
    document.body.appendChild(one_dot);
    one_dot.setAttribute("class", "one_dots");
    one_dot.setAttribute("style",
        "position: absolute; z-index: -1;" +
        " left: " + Math.floor(Math.random() * 99) + "vw;" +
        " top: " + Math.floor(Math.random() * (height / 15)) + "vw;" +
        " opacity: " + Math.floor(Math.random() * dotsOpacity) + "%;");
    one_dot.innerHTML = ".";

    if (Math.floor(Math.random() * brightChance) == 0 && sliding == false) {
      one_dot.style.color = "red";
      one_dot.style.opacity = "100%";
    }
    else if (sliding == true) {
      dotsOpacity = 100;
      dotsCount = 300;
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
      document.title = roomNames[document.title[0].charCodeAt(0) - 64];
      setup();
      clearInterval(slideCount);
    }
  }, 1);
}

function translatePigpen() {
  var targetDivs = document.getElementsByClassName("pigpen_text");
  var temp = [];

  for (var i = 0; i < targetDivs.length; i++) {
    temp[i] = targetDivs[i].innerHTML;
    targetDivs[i].innerHTML = "";

    for (var j = 0; j < temp[i].length; j++) {
      var pig = document.createElement("IMG");
      targetDivs[i].appendChild(pig);

      if (temp[i][j] != " " && temp[i][j] != "-") {
        pig.setAttribute("class", "pigpens");
        pig.setAttribute("src", "pigpen/pig_" + (temp[i][j].charCodeAt(0) - 64) + ".png");
      }
      else if (temp[i][j] == "-") {
        pig.setAttribute("src", "pigpen/pig_dash.png");
      }
    }
  }
}
