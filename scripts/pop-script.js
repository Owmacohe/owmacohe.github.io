var typeDes = ["type", "rocky", "water", "gas", "lush"];
var sizeDec = ["size", "asteroid", "dwarf", "average", "giant"];

var decPath = [typeDes, sizeDec];
var pathNum = 0;

var leftChoice = "";
var rightchoice = "";

var worldStats = [];

function createWorld() {
  document.getElementById("worldBox").style.visibility = "visible";
  document.getElementById("beginButton").style.visibility = "hidden";

  loadChoice();
}

function loadChoice() {
  document.getElementById("choice").innerHTML = "Choose a " + decPath[pathNum][0] + " for your world";

  leftChoice = decPath[pathNum][getNonZeroNum(4)];
  rightChoice = decPath[pathNum][getNonZeroNum(4)];

  while (leftChoice == rightChoice) {
    rightChoice = decPath[pathNum][getNonZeroNum(4)];
  }

  document.getElementById("leftChoice").innerHTML = leftChoice;
  document.getElementById("rightChoice").innerHTML = rightChoice;
}

function choose(direction) {
  switch (direction) {
    case "left":
      worldStats[pathNum] = leftChoice;
      pathNum++;
      loadChoice();
      break;
    case "right":
      worldStats[pathNum] = rightChoice;
      pathNum++;
      loadChoice();
      break;
  }

  console.log(worldStats);
}

function getNonZeroNum(length) {
  var result = Math.floor(Math.random() * length);

  while (result == 0) {
    result = Math.floor(Math.random() * length);
  }

  return result;
}
