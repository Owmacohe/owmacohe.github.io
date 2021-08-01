var colourChance;

window.onload = function() {
  var backTextElem;

  var speed = 0;

  var spikeChance = 300;
  var isSpiking = false;

  colourChance = 10000;

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
  else {
    colourChance = Math.floor(Math.random() * 500) + 500; //500 to 1000
  }

  backTextElem = document.createElement("DIV");
  document.body.appendChild(backTextElem);
  backTextElem.setAttribute("id", "backgroundText");

  backTextElem.innerHTML = getRandomCharacter(2.5 * window.innerWidth, "special");
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

    if (temp >= 20 && temp < 40) {
      randOutput += "<em>" + characters[Math.floor(Math.random() * characters.length)] + "</em>";
    }
    else if (temp >= 0 && temp < 20) {
      randOutput += "<strong>" + characters[Math.floor(Math.random() * characters.length)] + "</strong>";
    }
    else {
      randOutput += characters[Math.floor(Math.random() * characters.length)];
    }
  }

  return randOutput;
}
