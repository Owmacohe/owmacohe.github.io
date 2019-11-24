//Level of dissolution (categoryNames level)
var dissNum = 0;

//Value that is used for determining randomness (used in two mathematical operations)
var chaosRange = 20;

//General starting info for the buttons
var buttonSize;
var marginSize;
var textSize;
//var startingShrink = 0.5;

//2D array of category names that is added to and called from when switching between levels
var categoryNames = [
  [0, "Default", "Life"],
  [1, "Life", "Education", "Hobbies", "Work", "Food"],
  [2, "Education"],
  [2, "Hobbies"],
  [2, "Work"],
  [2, "Food"]
]

var currentBranchName;

function split(pathName) {
  currentBranchName = pathName;

  //Creating the path as categories are selected
  if (dissNum >= 1) {
    var pathElement = document.createElement("BUTTON");
    document.getElementById("navPath").appendChild(pathElement);
    pathElement.setAttribute("class", "pElements");
    pathElement.setAttribute("id", dissNum);
    pathElement.setAttribute("onclick", "loadBranch(this.id, this.innerHTML)");
    pathElement.innerHTML = pathName;

    var pathSeparator = document.createElement("STRONG");
    document.getElementById("navPath").appendChild(pathSeparator);
    pathSeparator.innerHTML = ">";

    document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
  }
  //

  //Showing the nav incrimentally as the level increases
  if (dissNum == 1) {
    document.getElementById("navPath").style.opacity = 1;
  }
  else if (dissNum == 2) {
    document.getElementById("navAdd").style.opacity = 1;
    document.getElementById("navAdd").style.pointerEvents = "auto";
  }
  //

  //Loading the level, then upping it for next time
  loadBranch(dissNum, pathName);

  dissNum++;
  //
}

function loadBranch(branchNum, targetName) {
  //Setting the level to the target level
  dissNum = branchNum;

  buttonSize = 40;
  buttonSize = shrinkFactor(buttonSize);
  marginSize = 2;
  marginSize = shrinkFactor(marginSize);
  textSize = 15;
  textSize = shrinkFactor(textSize);

  //Removing all the current categories, adding a new array for a new level if necessary, and then adding the categories based on the level
  var categoryParent = document.getElementById("divs");
  while (categoryParent.firstChild) {
    categoryParent.firstChild.remove();
  }

  if (targetName == null) {
    targetName = "Default";
  }

  for (i = 0; i < categoryNames.length; i++) {
    if (categoryNames[i][0] == dissNum && categoryNames[i][1] == targetName) {
      for (j = 2; j < categoryNames[i].length; j++) {
        addNewCategory();
      }
    }
  }
  //

  //Naming the newly added categories, and shortening them if necessary
  var categories = categoryParent.children;

  for (k = 0; k < categoryNames.length; k++) {
    if (categoryNames[k][0] == dissNum && categoryNames[k][1] == targetName) {
      for (l = 2, m = 0; l < categoryNames[k].length; l++, m++) {
        categories[m].innerHTML = categoryNames[k][l];

        if (categories[m].innerHTML.length >= 5 && categories[m].innerHTML.length < 10) {
          reduceSize(categories[m], 0.6);
        }
        else if (categories[m].innerHTML.length >= 10) {
          reduceSize(categories[m], 0.4);
        }
      }
    }
  }
  //

  if (dissNum >= 1) {
    document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
  }
}

function reduceSize(categ, shrink) {
  categ.style.fontSize = (textSize * shrink) + "vh";
}

function addNewCategory(newName, targetName) {
  //Creates the button, and sets/adds the necessary attributes
  var newCategory = document.createElement("BUTTON");
  document.getElementById("divs").appendChild(newCategory);

  newCategory.setAttribute("onclick", "split(this.innerHTML)");
  newCategory.setAttribute("class", "flex_split");
  //

  //Chance to randomly affect the width, height, margin size, text size, background colour, text colour, and alignment
  newCategory.style.width = chaosChance(chaosReduction(buttonSize), buttonSize + "vh");
  newCategory.style.height = chaosChance(chaosReduction(buttonSize), buttonSize + "vh");
  newCategory.style.margin = chaosChance(chaosReduction(marginSize), marginSize + "vh");
  newCategory.style.fontSize = chaosChance(chaosReduction(textSize), textSize + "vh");

  var hue = 60 + (dissNum * 40);
  newCategory.style.backgroundColor = chaosChance(randColor(), "hsl("+hue+", 100%, 70%)");
  newCategory.style.color = chaosChance(randColor(), "black");

  var chaosFactor = Math.floor(Math.random() * (chaosRange + 1));
  if (chaosFactor < dissNum && chaosFactor > 0) {
    newCategory.style.position = "absolute";
    newCategory.style.top = randPercent();
    newCategory.style.left = randPercent();
  }
  //

  //If the function is being called to add a new category, name it properly and add it to its correct level
  if (newName != null) {
    newCategory.innerHTML = newName;

    for (n = 0; n < categoryNames.length; n++) {
      console.log("A: " + categoryNames[n][0] + " " + (dissNum - 1));
      console.log("B: " + categoryNames[n][1] + " " + targetName);

      if (categoryNames[n][0] == dissNum - 1 && categoryNames[n][1] == targetName) {
        categoryNames[n][categoryNames[n].length] = newName;
        categoryNames[categoryNames.length] = [dissNum, newName];
        console.log("ADDED TO ARRAY SPOT " + dissNum);
      }
    }

    if (newCategory.innerHTML.length >= 5 && newCategory.innerHTML.length < 10) {
      reduceSize(newCategory, 0.6);
    }
    else if (newCategory.innerHTML.length >= 10) {
      reduceSize(newCategory, 0.4);
    }
  }
  //
}

//Function that creates the amount that the size, margin, and text are shrunk by
//Set up so that the initial button has a size of about 0.5
function shrinkFactor(property) {
  for (o = 0; o < dissNum; o++) {
    //var shrinkAmount = -Math.pow(1.9, -(3 * (dissNum + startingShrink))) + 1;
    property = property * (Math.pow(1.9, -(2.6 * (dissNum))) + 0.8);
  }

  return property;
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

  for (p = 0; p < 6; p++)
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
  if (event.keyCode == 13 && document.getElementById("input").value != "") {
    addNewCategory(document.getElementById("input").value, currentBranchName);
    document.getElementById("input").value = "";
  }
}
