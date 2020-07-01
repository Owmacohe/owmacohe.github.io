var scenePath = "0";
var inventory = [];

function sceneConfig(screens, pathAddition, jump, invItem) {
  if (invItem != null) {
    if (document.getElementById("inventory") == null) {
      addInventory(invItem, true);
    }
    else {
      addInventory(invItem, false);
    }
  }

  //clearScene();

  if (screens == null && pathAddition == null) {
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

  document.getElementById("path").innerHTML = "Path: " + result;
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

        switch (scenePath) {
          case "0_3":
            newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, 2, false, 'leaf')");
            break;
          case "0_1_3":
            newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, 2, false, 'skull')");
            break;
          case "0_2_1":
            newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, 2, false, 'minerals')");
            break;
          default:
            newChoice.setAttribute("onclick", "sceneConfig(scene"+scenePath+"_2, 2)");
        }

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

function addInventory(item, firstTime) {
  if (firstTime == true) {
    var newInv = document.createElement("DIV");
    newInv.setAttribute("id", "inventory");
    document.getElementById("body").appendChild(newInv);

    var invText = document.createElement("DIV");
    invText.setAttribute("style", "margin-top: 1.8vw;");
    invText.innerHTML = "Inventory:";
    document.getElementById("inventory").appendChild(invText);
  }

  var newItem = document.createElement("IMG");
  newItem.setAttribute("class", "inventoryItem");
  document.getElementById("inventory").appendChild(newItem);

  switch (item) {
    case "leaf":
      newItem.setAttribute("src", "images/leaf.png");
      newItem.setAttribute("id", "leafItem");
      inventory[inventory.length] = "leaf";
      break;
    case "skull":
      for (var i = 0; i < 2; i++) {
        newItem.setAttribute("src", "images/skull.png");
        newItem.setAttribute("id", "skullItem");
        inventory[inventory.length] = "skull";
      }
      break;
    case "minerals":
      for (var i = 0; i < 2; i++) {
        newItem.setAttribute("src", "images/minerals.png");
        newItem.setAttribute("id", "mineralsItem");
        inventory[inventory.length] = "minerals";
      }
      break;
  }
}
