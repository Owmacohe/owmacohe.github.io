//var currentScene = [];
var scenePath = "1";
//var screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9;

function sceneConfig(screens, pathAddition) {
  //clearScene();

  if (screens == null && pathAddition == null) {
    setScene(scene1);
  }
  else {
    if (scenePath == "1") {
      var newHeader = document.createElement("DIV");
      newHeader.setAttribute("id", "header");
      document.getElementById("body").appendChild(newHeader);

      document.getElementById("header").innerHTML = "";
      setPath("Path: ");
    }

    scenePath = scenePath + "_" + pathAddition;
    setScene(screens);

    switch (pathAddition) {
      case 1:
        setPath("UP =>");
        break;
      case 2:
        setPath("LEFT =>");
        break;
      case 3:
        setPath("RIGHT =>");
        break;
      case 4:
        setPath("DOWN =>");
        break;
    }
  }

  //getScene();
  console.log("CURRENT PATH: " + scenePath);
}

function setPath(direction) {
  document.getElementById("header").innerHTML = document.getElementById("header").innerHTML + direction + " ";
}

function setScene(inputScene) {


  for (var i = 0; i < 9; i++) {
    document.getElementById("s" + (i+1)).innerHTML = inputScene[i];
    var newChoice = document.createElement("BUTTON");

    switch (i+1) {
      case 1:
        document.getElementById("s1").innerHTML = randomFill("down");
        break;
      case 2:
        newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_1, 1)");
        newChoice.innerHTML = "UP";
        document.getElementById("s2").appendChild(newChoice);
        break;
      case 3:
        document.getElementById("s3").innerHTML = randomFill("down");
        break;
      case 4:
        newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, 2)");
        newChoice.innerHTML = "LEFT";
        document.getElementById("s4").appendChild(newChoice);
        break;
      case 6:
        newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_3, 3)");
        newChoice.innerHTML = "RIGHT";
        document.getElementById("s6").appendChild(newChoice);
        break;
      case 7:
        document.getElementById("s7").innerHTML = randomFill("up");
        break;
      case 8:
        newChoice.setAttribute("onclick", "window.location.href = 'release.html'");
        newChoice.innerHTML = "DOWN";
        document.getElementById("s8").appendChild(newChoice);
        break;
      case 9:
        document.getElementById("s9").innerHTML = randomFill("up");
        break;
    }
  }
}

/*
function getScene() {
  for (var i = 0; i < 9; i++) {
    currentScene[i] = document.getElementById("s" + (i+1)).innerHTML;
  }
}
*/

/*
function clearScene() {
  for (var i = 0; i < 9; i++) {
    document.getElementById("s" + (i+1)).innerHTML = "";
  }
}
*/

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
  var randOutput = "";
  var characters = "aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz0123456789!@#$%^&*()-=_+`~[]{}:;,.?/";

  for (var i = 0; i < iterations; i++) {
    randOutput += characters[Math.floor(Math.random() * characters.length)];
  }

  return randOutput + "<br>";
}
