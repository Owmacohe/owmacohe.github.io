// 0_1_3_2, Humming Skull
// 0_2_1_2, Deep Minerals
// 0_3_2, Dust Leaf

// 0_1_2_1, The Lectode Triumvirate
// 0_2_2, Gnan Arcestul
// 0_3_1_1, Iovanteres Calacent

var scenePath = "0";
var inventory = [];
var companions = [];

var isWriting = false;

function sceneConfig(targetScene, pathAddition, jump, invItem) {
  if (isWriting == false) {
    if (targetScene == null && pathAddition == null) {
      setScene(scene0);
      writeScreens();
    }
    else {
      if (scenePath == "0" && document.getElementById("path") == null) {
        var newPath = document.createElement("DIV");
        newPath.setAttribute("id", "path");
        document.getElementById("body").appendChild(newPath);
      }

      if (jump == true) {
        scenePath = pathAddition;
        setPath();

        if (scenePath == "0") {
          document.getElementById("path").remove();
        }
      }
      else {
        scenePath = scenePath + "_" + pathAddition;
        setPath();
      }

      setScene(targetScene);
      writeScreens();
    }

    if (scenePath == "0_2_2") {
      highlightScene("a", "name", "b");

      if (document.getElementById("companions") == null) {
        addMenu("companion", true);
      }
      else {
        addMenu("companion", false);
      }
    }

    if (scenePath == "0_3_2" || scenePath ==  "0_1_3_2" || scenePath ==  "0_2_1_2") {
      if (document.getElementById("inventory") == null) {
        addMenu("inventory", true);
      }
      else {
        addMenu("inventory", false);
      }

      if (scenePath == "0_3_2") {
        highlightScene("a", "name", "b");
      }
    }

    document.getElementById("body").addEventListener("keydown", function(event) {
      switch (event.keyCode) {
        case 38:
          sceneConfig("scene"+scenePath+"_1", "1");
          break;
        case 37:
          sceneConfig("scene"+scenePath+"_2", "2");
          break;
        case 39:
          sceneConfig("scene"+scenePath+"_3", "3");
          break;
        case 40:
          window.location.href = "epilogue.html";
          break;
      }
    });

    //loadCorners();
    console.log("CURRENT PATH: " + scenePath);
  }
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

  document.getElementById("path").innerHTML = "PATH: " + result;
}

function setScene(inputScene) {
  for (var i = 0; i < 9; i++) {
    switch (i+1) {
      case 1:
        document.getElementById("s1").innerHTML = randomFill("down");
        break;
      case 3:
        document.getElementById("s3").innerHTML = randomFill("down");
        break;
      case 7:
        document.getElementById("s7").innerHTML = randomFill("up");
        break;
      case 9:
        document.getElementById("s9").innerHTML = randomFill("up");
        break;
    }
  }

  for (var i = 0; i < 9; i++) {
    var newChoice = document.createElement("BUTTON");

    switch (i+1) {
      case 2:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[0];

        removeElement("b1");
        newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_1, '1')");
        newChoice.setAttribute("class", "moveOptions");
        newChoice.setAttribute("id", "b1");
        newChoice.innerHTML = "UP";
        document.getElementById("s2").appendChild(newChoice);
        break;
      case 4:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[1];

        removeElement("b2");

        switch (scenePath) {
          case "0_3":
            newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, '2', false, 'leaf')");
            break;
          case "0_1_3":
            newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, '2', false, 'skull')");
            break;
          case "0_2_1":
            newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, '2', false, 'minerals')");
            break;
          default:
            newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, '2')");
        }

        newChoice.setAttribute("class", "moveOptions");
        newChoice.setAttribute("id", "b2");
        newChoice.innerHTML = "LEFT";
        document.getElementById("s4").appendChild(newChoice);
        break;
      case 5:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[2];
        break;
      case 6:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[3];

        removeElement("b3");
        newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_3, '3')");
        newChoice.setAttribute("class", "moveOptions");
        newChoice.setAttribute("id", "b3");
        newChoice.innerHTML = "RIGHT";
        document.getElementById("s6").appendChild(newChoice);
        break;
      case 8:
        document.getElementById("t" + (i+1)).innerHTML = inputScene[4];

        removeElement("b4");
        newChoice.setAttribute("onclick", "window.location.href = 'epilogue.html'");
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

/*
function loadCorners() {
  for (var j = 0; j < 4; j++) {
    var newLetter = document.createElement("DIV");
    newLetter.setAttribute("class", "smallLetters");
    newLetter.innerHTML = getRandomCharacter(1, "alpha");
    document.getElementById("infoScreen").appendChild(newLetter);

    switch (j) {
      case 0:
        newLetter.setAttribute("style", "top: 0; right: 0;");
        break;
      case 1:
        newLetter.setAttribute("style", "top: 0; left: 0;");
        break;
      case 2:
        newLetter.setAttribute("style", "bottom: 0; right: 0;");
        break;
      case 3:
        newLetter.setAttribute("style", "bottom: 0; left: 0;");
        break;
    }
  }
}
*/

function addMenu(menuType, firstTime) {
  var menuID;
  var menuText;

  if (menuType == "inventory") {
    menuID = "inventory";
    menuText = "INVENTORY:";
  }
  else if (menuType == "companion") {
    menuID = "companions";
    menuText = "COMPANIONS:";
  }

  if (firstTime == true) {
    var newMenu = document.createElement("DIV");
    newMenu.setAttribute("id", menuID);
    document.getElementById("body").appendChild(newMenu);

    var menuTitle = document.createElement("DIV");
    menuTitle.setAttribute("style", "margin-top: 2vw;");
    menuTitle.innerHTML = menuText;
    document.getElementById(menuID).appendChild(menuTitle);
  }

  var newItem = document.createElement("IMG");
  newItem.setAttribute("class", "menuItem");
  document.getElementById(menuID).appendChild(newItem);

  switch (scenePath) {
    /* Iventory */
    case "0_3_2":
      newItem.setAttribute("src", "images/leaf.png");
      inventory[inventory.length] = "leaf";
      break;
    case "0_1_3_2":
      newItem.setAttribute("src", "images/skull.png");
      inventory[inventory.length] = "skull";
      break;
    case "0_2_1_2":
      newItem.setAttribute("src", "images/minerals.png");
      inventory[inventory.length] = "minerals";
      break;

    /* Companions */
    case "0_2_2":
      newItem.setAttribute("src", "images/arcestul.png");
      companions[companions.length] = "arcestul";
      break;
  }
}

function highlightScene(firstID, secondID, thirdID) {
  var texts = document.getElementsByClassName("textScreen");
  var arts = document.getElementsByClassName("artScreen");
  //var letters = document.getElementsByClassName("smallLetters");

  for (var i = 0; i < 4; i++) {
    texts[i].style.visibility = "hidden";
    arts[i].style.visibility = "hidden";
    //letters[i].style.visibility = "hidden";
  }

  var info = document.getElementById("infoScreen");
  info.setAttribute("id", "bigInfo");
  document.getElementById("t5").style.fontSize = "3vw";

  if (document.getElementById(firstID) != null) {
    writeWait(firstID, 70);
  }

  if (document.getElementById(secondID) != null) {
    writeWait(secondID, 125, 16000);
    document.getElementById(secondID).style.fontSize = "3vw";
  }

  if (document.getElementById(thirdID) != null) {
    writeWait(thirdID, 125, 18000);
  }

  if (document.getElementById(firstID) == null && document.getElementById(secondID) == null && document.getElementById(thirdID) == null) {
    writeWait("t5", 70);
  }

  setTimeout(function() {
    for (var i = 0; i < 4; i++) {
      texts[i].style.visibility = "visible";
      arts[i].style.visibility = "visible";
      //letters[i].style.visibility = "visible";
    }

    info.setAttribute("id", "infoScreen");
    document.getElementById("t5").style.fontSize = "1.75vw";
    document.getElementById("name").style.fontSize = "2vw";
  }, 22000);
}
