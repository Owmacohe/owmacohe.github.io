loadBackText();

function loadBackText() {
  var backTextElem = document.createElement("DIV");
  document.body.appendChild(backTextElem);
  backTextElem.setAttribute("id", "backgroundText");

  //var charNum = (1440 / window.innerWidth) * 1440;
  backTextElem.innerHTML = getRandomCharacter(2.5 * window.innerWidth, "alphaNum");
}

function getRandomCharacter(iterations, type) {
  var randOutput = "";
  var characters;

  if (type != null) {
    if (type == "alpha") {
      characters = "abcdefghijklmnopqrstuvwxyz";
    }
    else if (type == "alphaNum") {
      characters = "abcdefghijklmnopqrstuvwxyz01234567";
    }
  }
  else {
    characters = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+`~[]{}:;,.?/";
  }

  //console.log(characters);

  for (var i = 0; i < iterations; i++) {
    randOutput += characters[Math.floor(Math.random() * characters.length)];
  }

  return randOutput;
}
