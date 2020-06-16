var currentScene = [];
var screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9;

function load(screens) {
  clearScene();

  if (screens == null) {
    setScene(scene01);
  }

  getScene();
}

function setScene(inputScene) {
  for (var i = 0; i < 9; i++) {
    document.getElementById("s" + (i+1)).innerHTML = inputScene[i];

    switch (i+1) {
      case 1:
        document.getElementById("s1").innerHTML = randomFill("down");
        break;
      case 2:
        document.getElementById("s2").innerHTML = document.getElementById("s2").innerHTML + "<br><br><br><a>UP</a>";
        break;
      case 3:
        document.getElementById("s3").innerHTML = randomFill("down");
        break;
      case 4:
        document.getElementById("s4").innerHTML = document.getElementById("s4").innerHTML + "<br><br><br><a>LEFT</a>";
        break;
      case 6:
        document.getElementById("s6").innerHTML = document.getElementById("s6").innerHTML + "<br><br><br><a>RIGHT</a>";
        break;
      case 7:
        document.getElementById("s7").innerHTML = randomFill("up");
        break;
      case 8:
        document.getElementById("s8").innerHTML = document.getElementById("s8").innerHTML + "<br><br><br><a>DOWN</a>";
        break;
      case 9:
        document.getElementById("s9").innerHTML = randomFill("up");
        break;
    }
  }
}

function getScene() {
  for (var i = 0; i < 9; i++) {
    currentScene[i] = document.getElementById("s" + (i+1)).innerHTML;
  }
}

function clearScene() {
  for (var i = 0; i < 9; i++) {
    document.getElementById("s" + (i+1)).innerHTML = "";
  }
}

function randomFill(direction) {
  var output = "";

  if (direction == "down") {
    /* line 1 */ output += getRandomCharacter(1);
    /* line 2 */ output += getRandomCharacter(3);
    /* line 3 */ output += getRandomCharacter(7);
    /* line 4 */ output += getRandomCharacter(12);
    /* line 5 */ output += getRandomCharacter(16);
    /* line 6 */ output += getRandomCharacter(23);
    /* line 7 */ output += getRandomCharacter(30);
  }
  else if (direction == "up") {
    /* line 1 */ output += getRandomCharacter(30);
    /* line 2 */ output += getRandomCharacter(23);
    /* line 3 */ output += getRandomCharacter(16);
    /* line 4 */ output += getRandomCharacter(12);
    /* line 5 */ output += getRandomCharacter(7);
    /* line 6 */ output += getRandomCharacter(3);
    /* line 7 */ output += getRandomCharacter(1);
  }

  return output;
}

function getRandomCharacter(iterations) {
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var randOutput = "";

  for (var i = 0; i < iterations; i++) {
    randOutput += characters[Math.floor(Math.random() * characters.length)];
  }

  return randOutput + "<br>";
}
