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
    [2, "Education", "Kindergarden", "Elementary", "Middle School", "High School", "Cegep", "College", "University", "Graduate Work"],
      [3, "Kindergarden"], [3, "Elementary"], [3, "Middle School"], [3, "High School"], [3, "Cegep"], [3, "College"], [3, "University"], [3, "Graduate Work"],
    [2, "Hobbies", "Sports", "Writing", "Biking", "Games", "Swimming", "Arts"],
      [3, "Sports"], [3, "Writing"], [3, "Biking"], [3, "Games"], [3, "Swimming"], [3, "Arts"],
    [2, "Work", "Teaching", "Architecture and Construction", "Arts and Culture", "Law and Police", "Governmental", "Business", "Communications", "Health", "Science", "Engineering and Computer Science", "Culinary"],
      [3, "Teaching"], [3, "Architecture and Construction"], [3, "Arts and Culture"], [3, "Law and Police"], [3, "Governmental"], [3, "Business"], [3, "Communications"], [3, "Health"], [3, "Science"], [3, "Engineering and Computer Science"], [3, "Culinary"],
    [2, "Food", "Fruits and Vegetables", "Baked Goods", "Dairy", "Meat and Other Animal By-products", "Cultural Foods", "Food Indistry"],
      [3, "Fruits and Vegetables"], [3, "Baked Goods"], [3, "Dairy"], [3, "Meat and Other Animal By-products"], [3, "Cultural Foods"], [3, "Food Industry"]
];

//Helps with finding the correct branch
var currentBranchName;

//Array for loading the map in the nav
var pathItems = [];

function split(pathName) {
  //Setting the navigation variables properly
  currentBranchName = pathName;

  pathItems[dissNum] = pathName;
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
  loadBranch(dissNum, pathName, false);

  dissNum++;
  //
}

function loadBranch(branchNum, targetName, navSelection) {
  currentBranchName = targetName;

  //Setting the level to the target level
  dissNum = branchNum;

  for (r = 0; r < pathItems.length; r++) {
    if (pathItems[r] == null) {
      pathItems.splice(r, 1);
    }

    if (r >= dissNum && navSelection == true) {
      pathItems.splice(r, pathItems.length - r);
    }
  }

  //Each time the branch is reloaded, so is the map
  var pathParent = document.getElementById("navPath");
  while (pathParent.firstChild) {
    pathParent.firstChild.remove();
  }

  var pathStart = document.createElement("STRONG");
  document.getElementById("navPath").appendChild(pathStart);
  pathStart.innerHTML = "Path: ";

  for (q = 0; q < pathItems.length; q++) {
    if (dissNum >= 1) {
      var pathElement = document.createElement("BUTTON");
      document.getElementById("navPath").appendChild(pathElement);
      pathElement.setAttribute("class", "pElements");
      pathElement.setAttribute("id", q + 1);
      pathElement.setAttribute("onclick", "loadBranch(this.id, this.innerHTML, true)");
      pathElement.innerHTML = pathItems[q];

      var pathSeparator = document.createElement("STRONG");
      document.getElementById("navPath").appendChild(pathSeparator);
      pathSeparator.innerHTML = ">";

      document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
    }
  }
  //

  //Making sure that the size changes based on the dissNum, not just simply getting smaller and smaller
  buttonSize = 40;
  buttonSize = shrinkFactor(buttonSize);
  marginSize = 2;
  marginSize = shrinkFactor(marginSize);
  textSize = 15;
  textSize = shrinkFactor(textSize);
  //

  //Removing all the current categories, adding a new array for a new level if necessary, and then adding the categories based on the level
  var categoryParent = document.getElementById("divs");
  while (categoryParent.firstChild) {
    categoryParent.firstChild.remove();
  }

  if (targetName == null) {
    targetName = "Default";
  }

  if (navSelection == true) {
    dissNum = parseInt(dissNum);
  }

  for (i = 0; i < categoryNames.length; i++) {
    if (categoryNames[i][1] == targetName) {
      for (j = 2; j < categoryNames[i].length; j++) {
        addNewCategory();
      }
    }
  }
  //

  //Naming the newly added categories, and shortening them if necessary
  var categories = categoryParent.children;

  for (k = 0; k < categoryNames.length; k++) {
    if (categoryNames[k][1] == targetName) {
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
    newCategory.style.right = randPercent();
  }
  //

  //If the function is being called to add a new category, name it properly and add it to its correct level
  if (newName != null) {
    newCategory.innerHTML = newName;

    for (n = 0; n < categoryNames.length; n++) {
      if (categoryNames[n][1] == targetName) {
        categoryNames[n][categoryNames[n].length] = newName;
        categoryNames[categoryNames.length] = [dissNum, newName];
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
    property = property * (Math.pow(1.9, -(2.8 * (dissNum))) + 0.8);
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
  if (event.keyCode == 13) {
    var alreadyAdded = false;
    for (s = 0; s < categoryNames.length; s++) {
      if (document.getElementById("input").value == categoryNames[s][1]) {
        alreadyAdded = true;
      }
    }

    var result = document.getElementById("input").value;

    if (result == "The creator of this site is great") {
      console.log("Thank you :)");
    }
    else if (result[0] != " " && result[result.length - 1] != " " && result != "" && alreadyAdded == false) {
      addNewCategory(document.getElementById("input").value, currentBranchName);
      document.getElementById("input").value = "";
    }
  }
}
