var backTextElem;

var speed = 100;
var colourDefault = 10000;
var colourChance;

var spikeChance = 300;
var isSpiking = false;

window.onload = function() {
  backTextElem = document.createElement("DIV");
  document.body.appendChild(backTextElem);
  backTextElem.setAttribute("id", "backgroundText");

  backTextElem.innerHTML = getRandomCharacter(2.5 * window.innerWidth, "special");

  colourChance = colourDefault;

  if (speed != 0) {
    var reloadBack = setInterval(function() {
      backTextElem.innerHTML = getRandomCharacter(2.5 * window.innerWidth, "special");
    }, speed);

    var randomSpike = setInterval(function() {
      if (isSpiking == false && Math.floor(Math.random() * spikeChance) == 0) {
        isSpiking = true;
        colourChance = colourDefault / 50;

        var temp = setTimeout(function() {
          colourChance = colourDefault;
          isSpiking = false;
        }, 1000);
      }
    }, speed);
  }
}

function getRandomCharacter(iterations, type) {
  var randOutput = "";
  var characters = "abcdefghijklmnopqrstuvwxyz";

  if (type != null) {
    switch (type) {
      case "alpha":
        characters += "";
        break;
      case "alphaNum":
        characters += "01234567";
        break;
      case "special":
        characters += "0123456789`~!@#$;";
        break;
    }
  }
  else {
    characters += "0123456789`~!@#$;";
  }

  for (var i = 0; i < iterations; i++) {
    var temp = Math.floor(Math.random() * colourChance);

    if (temp >= 1 && temp < 15) {
      randOutput += "<em>" + characters[Math.floor(Math.random() * characters.length)] + "</em>";
    }
    else if (temp == 0) {
      randOutput += "<strong>" + characters[Math.floor(Math.random() * characters.length)] + "</strong>";
    }
    else {
      randOutput += characters[Math.floor(Math.random() * characters.length)];
    }
  }

  return randOutput;
}
