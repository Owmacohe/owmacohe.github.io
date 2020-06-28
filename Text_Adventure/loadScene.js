var scenePath = "0";

function sceneConfig(screens, pathAddition, jump) {
  //clearScene();

  if (screens == null && pathAddition == null) {
    setScene(scene0);
    writeScreens();
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
    writeScreens();
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
    switch (i+1) {
      case 1:
        document.getElementById("s" + (i+1)).innerHTML = inputScene[i];
        document.getElementById("s1").innerHTML = randomFill("down");
        break;
      case 3:
        document.getElementById("s" + (i+1)).innerHTML = inputScene[i];
        document.getElementById("s3").innerHTML = randomFill("down");
        break;
      case 7:
        document.getElementById("s" + (i+1)).innerHTML = inputScene[i];
        document.getElementById("s7").innerHTML = randomFill("up");
        break;
      case 9:
        document.getElementById("s" + (i+1)).innerHTML = inputScene[i];
        document.getElementById("s9").innerHTML = randomFill("up");
        break;
    }
  }

  for (var i = 0; i < 9; i++) {
    var newChoice = document.createElement("BUTTON");

    switch (i+1) {
      case 2:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[i];

        removeElement("b1");
        newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_1, 1)");
        newChoice.setAttribute("class", "moveOptions");
        newChoice.setAttribute("id", "b1");
        newChoice.innerHTML = "UP";
        document.getElementById("s2").appendChild(newChoice);
        break;
      case 4:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[i];

        removeElement("b2");
        newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, 2)");
        newChoice.setAttribute("class", "moveOptions");
        newChoice.setAttribute("id", "b2");
        newChoice.innerHTML = "LEFT";
        document.getElementById("s4").appendChild(newChoice);
        break;
      case 5:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[i];
        break;
      case 6:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[i];

        removeElement("b3");
        newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_3, 3)");
        newChoice.setAttribute("class", "moveOptions");
        newChoice.setAttribute("id", "b3");
        newChoice.innerHTML = "RIGHT";
        document.getElementById("s6").appendChild(newChoice);
        break;
      case 8:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[i];

        removeElement("b4");
        newChoice.setAttribute("onclick", "window.location.href = 'release.html'");
        newChoice.setAttribute("class", "moveOptions");
        newChoice.setAttribute("id", "b4");
        newChoice.innerHTML = "DOWN";
        document.getElementById("s8").appendChild(newChoice);
        break;
    }
  }
}

function writeScreens() {
  for (var i = 0; i < 9; i++) {
    if (i == 2 || i == 4 || i == 6 || i == 8) {
      writeWait("t"+i);
    }
  }
}
