/* ### VARIABLES ### */

var decPath = [
  ["TYPE", "rocky", "water", "gas", "lush"],
  ["SIZE", "asteroid", "dwarf", "average", "giant"]
];
var pathNum = 0;

var leftChoice = "";
var rightchoice = "";

var worldStats = [];



/* ### GAME METHODS ### */

//starting function
function createWorld() {
  document.getElementById("worldBox").style.visibility = "visible";
  document.getElementById("beginButton").style.visibility = "hidden";

  loadChoice();
}

//loads apropriate choices depending on the current pathNum
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

//sets the world values depending on which direction has been chosen, and loads the new choice
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



/* ### UTILITY METHODS ### */

function getNonZeroNum(length) {
  var result = Math.floor(Math.random() * length);

  while (result == 0) {
    result = Math.floor(Math.random() * length);
  }

  return result;
}
