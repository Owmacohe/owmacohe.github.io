//var currentScene = [];
var scenePath = "0";
//var screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9;

function sceneConfig(screens, pathAddition, jump) {
  //clearScene();

  if (screens == null && pathAddition == null) {
    setScene(scene0);
  }
  else {
    if (scenePath == "0" && document.getElementById("header_left") == null) {
      var newHeader = document.createElement("DIV");
      newHeader.setAttribute("id", "header_left");
      document.getElementById("body").appendChild(newHeader);
    }

    if (jump == true) {
      scenePath = pathAddition;
      setPath();
    }
    else {
      scenePath = scenePath + "_" + pathAddition;
      setPath();
    }

    setScene(screens);
  }

  //getScene();
  console.log("CURRENT PATH: " + scenePath);
}

function setPath() {
  splitPath = scenePath.split("_");
  var result = "";

  for (var i = 1; i < splitPath.length; i++) {
    switch (splitPath[i]) {
      case "1":
        result += "UP => ";
        break;
      case "2":
        result += "LEFT => ";
        break;
      case "3":
        result += "RIGHT => ";
        break;
    }
  }

  document.getElementById("header_left").innerHTML = "Path: " + result;
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
