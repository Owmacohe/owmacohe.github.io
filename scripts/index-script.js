var patterns = [
  "-+*%$%*+-+*%$%*+-",
  "-•=/0/=•-•=/0/=•-",
  "'-.,__,.-'-.,__,.-",
  "-+<{?}>+-+<{?}>+-",
  "-z[(&)]z-z[(&)]z-",
  "-odO0Obo-odO0Obo-"
];
var chars = "";
var text = document.getElementsByClassName("flexanim");

function splitPattern() {
  var chosenPattern = Math.floor(Math.random() * patterns.length);

  chars = patterns[chosenPattern].split("");
}

var pixNum = 0;
var isIncreasing = true;

/*
var rainbowOn = false;

function toggleRainbow() {
  if (rainbowOn == false) {
    rainbowOn = true;
  }
}

var colourNum = 0;
var countNum = 0;
*/

var runCheck = setInterval(function change() {
  var i;
  for (i = chars.length; i > 0; i--) {
    chars[i] = chars[i - 1];
  }

  chars[0] = chars[chars.length - 1];
  chars.splice(chars.length - 1, 1);

  var j;
  for (j = 0; j < text.length; j++) {
    var newPattern = "";

    var k;
    for (k = 0; k < chars.length; k++) {
      newPattern = newPattern + chars[k];
    }

    text[j].innerHTML = newPattern;
  }

  if (pixNum > 3) {
    isIncreasing = false;
  }
  else if (pixNum < 2) {
    isIncreasing = true;
  }

  if (isIncreasing == true) {
    pixNum++;
  }
  else if (isIncreasing == false) {
    pixNum--;
  }

  document.getElementById("titleimage").setAttribute("src", "/Index_Media/Me"+pixNum+".png");

  /*
  if (rainbowOn == true) {
    colourNum += 15;

    if (colourNum > 345) {
      colourNum = 0;
    }

    document.getElementById("rainbow").style.color = "hsl("+colourNum+", 100%, 50%)";

    countNum++;

    if (countNum >= 50) {
      rainbowOn = false;
      countNum = 0;
      document.getElementById("rainbow").style.color = "black";
    }
  }
  */
}, 100);
