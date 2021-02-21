loadBackText();

function loadBackText() {
  var backTextElem = document.createElement("DIV");
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
    randOutput += characters[Math.floor(Math.random() * characters.length)];
  }

  return randOutput;
}
