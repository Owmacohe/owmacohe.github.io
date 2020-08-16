//var animationOn = true;

var patterns = [
  "-+*%$%*+",
  "-•=/0/=•",
  "-+<{?}>+",
  "-z[(&)]z",
  "-odO0Obo"
];

//var chars = "";

function setPattern() {
  var chosenPattern = Math.floor(Math.random() * patterns.length);
  var patternTemp = patterns[chosenPattern];

  for (var i = 0; i < 9; i++) {
    patterns[chosenPattern] += patternTemp;
  }

  document.getElementById("curvedText").innerHTML = patterns[chosenPattern];

  if (document.getElementById("curvedText") != null) {
    new CircleType(document.getElementById("curvedText")).radius(window.innerWidth / (1440 / 215));
  }
}

/*
var rainbowOn = false;

function toggleRainbow() {
  if (rainbowOn == false) {
    rainbowOn = true;
  }
}

var colourNum = 0;
var countNum = 0;

function animToggle() {
  switch (animationOn) {
    case true:
      animationOn = false;
      break;
    case false:
      animationOn = true;
      break;
  }
}
*/

var rotateNum = 0;

var rotateCircle = setInterval(function() {
  rotateNum += 4;
  document.getElementById("curvedText").style.transform = "rotate("+rotateNum+"deg)";

  /*
  if (animationOn == true) {
    var i;
    for (i = chars.length; i > 0; i--) {
      chars[i] = chars[i - 1];
    }

    chars[0] = chars[chars.length - 1];
    //chars.splice(chars.length - 1, 1);
    chars = chars.slice(0, -1);

    var j;
    for (j = 0; j < text.length; j++) {
      var newPattern = "";

      var k;
      for (k = 0; k < chars.length; k++) {
        newPattern = newPattern + chars[k];
      }

      text[j].innerHTML = newPattern;
    }

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
  }
  else {
    return;
  }
  */
}, 75);
