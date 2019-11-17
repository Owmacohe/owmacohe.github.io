//Level of dissolution (categoryNames level)
var dissNum = 0;

//Value that is used for determining randomness (used in two mathematical operations)
var chaosRange = 30;

//General starting info for the buttons
var buttonSize = 90;
var marginSize = 8;
var textSize = 30;
var startingShrink = 2;

//2D array of category names that is added to and called from when switching between levels
var categoryNames = [
  ["Life"],
  ["Education", "Hobbies", "Work", "Food"]
];

function split(categoryName) {
  //Creating the path as categories are selected
  if (dissNum >= 1) {
    var pathElement = document.createElement("BUTTON");
    document.getElementById("navPath").appendChild(pathElement);
    pathElement.setAttribute("class", "pElements");
    pathElement.setAttribute("id", dissNum);
    pathElement.setAttribute("onclick", "loadBranch("+this.id+"), false");
    pathElement.innerHTML = categoryName;

    var pathSeparator = document.createElement("STRONG");
    document.getElementById("navPath").appendChild(pathSeparator);
    pathSeparator.innerHTML = ">";
    pathSeparator.style.textDecoration = "none";

    document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
  }
  //

  //Showing the nav incrimentally as the level increases
  if (dissNum == 1) {
    document.getElementById("navPath").style.opacity = 1;
  }
  else if (dissNum >= 2) {
    document.getElementById("navAdd").style.opacity = 1;
    document.getElementById("navAdd").style.pointerEvents = "auto";
  }
  //

  //Loading the level, then upping it for next time
  loadBranch(dissNum, true);

  dissNum++;
  //
}

function loadBranch(branchNum, shrink) {
  if (shrink == true) {
    buttonSize = buttonSize * shrinkFactor();
    marginSize = marginSize * shrinkFactor();
    textSize = textSize * shrinkFactor();
  }

  //Setting the level to the target level
  dissNum = branchNum;

  //Removing all the current categories, adding a new array for a new level if necessary, and then adding the categories based on the level
  var parent = document.getElementById("divs");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }

  if (categoryNames[dissNum] == null) {
    categoryNames[dissNum] = [];
  }

  addNewCategory(categoryNames[dissNum].length, false, "");
  //

  //Naming the newly added categories
  //var categories = document.getElementsByClassName("flex_split");
  var categories = parent.children;
  console.log(categories);

  for (k = 0; k < categoryNames[dissNum].length; k++) {
    categories[k].innerHTML = categoryNames[dissNum][k];

    if (categories[k].innerHTML.length >= 6) {
      categories[k].style.fontSize = (textSize * 0.6) + "vh";
    }
  }
  //

  document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
}

//Function that creates the amount that the size, margin, and text are shrunk by
//Set up so that the initial button has a size of about 0.5
function shrinkFactor() {
  var shrinkAmount = -Math.pow(1.9, -(0.56 * (startingShrink + dissNum))) + 1;
  return shrinkAmount;
}

function addNewCategory(iterations, newAddition, newName) {
  for (i = 0; i < iterations; i++) {
    //Creates the button, and adds the necessary attributes
    var splitButt = document.createElement("BUTTON");
    document.getElementById("divs").appendChild(splitButt);

    splitButt.setAttribute("onclick", "split(this.innerHTML)");
    splitButt.setAttribute("class", "flex_split");
    //

    //Chance to randomly affect the width, height, margin size, text size, background colour, text colour, and alignment
    splitButt.style.width = chaosChance(chaosReduction(buttonSize), buttonSize + "vh");
    splitButt.style.height = chaosChance(chaosReduction(buttonSize), buttonSize + "vh");
    splitButt.style.margin = chaosChance(chaosReduction(marginSize), marginSize + "vh");
    splitButt.style.fontSize = chaosChance(chaosReduction(textSize), textSize + "vh");

    var hue = 60 + (dissNum * 40);
    splitButt.style.backgroundColor = chaosChance(randColor(), "hsl("+hue+", 100%, 70%)");
    splitButt.style.color = chaosChance(randColor(), "black");

    var chaosFactor = Math.floor(Math.random() * ((80 * chaosRange) + 1));
    if (chaosFactor < dissNum && chaosFactor > 0) {
      splitButt.style.position = "absolute";
      splitButt.style.top = randPercent();
      splitButt.style.left = randPercent();
    }
    //

    //If it's a big name, shorten it
    if (splitButt.innerHTML.length >= 6) {
      splitButt.style.fontSize = (textSize * 0.6) + "vh";
    }

    if (newAddition == true) {
      splitButt.innerHTML = newName;

      categoryNames[dissNum].push(newName);
    }

    console.log("added category");
  }
}

//Function for determining whether a button "breaks" or not
function chaosChance(rand, def) {
  var chaosFactor = Math.floor(Math.random() * (chaosRange + 1));
  if (chaosFactor < dissNum && chaosFactor > 0) {
    return rand;
  }
  else {
    return def;
  }
}

//Generates the amount that the button would shrink by
function chaosReduction(size) {
  return (size - (size * (0.1 * Math.floor(Math.random() * 6)))) + "vh";
}

//Random colour generator (hex)
function randColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";

  for (i = 0; i < 6; i++)
  {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

//Random percentage generator
function randPercent() {
  return Math.floor(Math.random() * 101) + "%";
}

//When the user preses enter after filling out the field, a new category is added to both the screen and the corresponding level
function addCheck(event) {
  if (event.keyCode == 13) {
    addNewCategory(1, true, document.getElementById("input").value);
    document.getElementById("input").value = "";
  }
}
