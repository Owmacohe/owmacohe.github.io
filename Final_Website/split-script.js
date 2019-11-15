//Number of current buttons/categories
var buttNum = 0;
//Number  of times the user has clicked a button
var dissNum = 0;

var chaosRange = 30;

//Button length/width, margin, and text sizes
var buttonSize = 90;
var marginSize = 8;
var textSize = 30;
//Starting variable that helps determine the size of the first square
var startingShrink = 2;

var categoryNames = [
  ["Life"],
  ["Education", "Hobbies", "Work", "Food"]
];

//Function that is called when the user selects a category
function split(category) {
  var categories = document.getElementsByClassName("flex_split");

  if (buttNum == 0) {
    createButt(1);
  }
  else if (buttNum > 0) {
    dissNum++;

    const parent = document.getElementById("divs");
    while (parent.firstChild) {
      parent.firstChild.remove();
    }

    if (categoryNames[dissNum] == null) {
      categoryNames[dissNum] = [];
    }

    createButt(categoryNames[dissNum].length);

    document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
  }

  if (dissNum == 1) {
    document.getElementById("navPath").style.opacity = 1;
  }
  else if (dissNum >= 2) {
    document.getElementById("navAdd").style.opacity = 1;
    document.getElementById("navAdd").style.pointerEvents = "auto";
  }

  if (dissNum >= 1) {
    var pathElement = document.createElement("BUTTON");
    document.getElementById("navPath").appendChild(pathElement);
    pathElement.className = "pElements";
    var targetBranch = dissNum - 2;
    pathElement.setAttribute("id", targetBranch);
    pathElement.setAttribute("onclick", "loadBranch("+targetBranch+")");
    pathElement.innerHTML = category;

    var pathSeparator = document.createElement("STRONG");
    document.getElementById("navPath").appendChild(pathSeparator);
    pathSeparator.innerHTML = ">";
    pathSeparator.style.textDecoration = "none";
  }

  for (k = 0; k < categoryNames[dissNum].length; k++) {
    categories[k].innerHTML = "";
    categories[k].innerHTML = categoryNames[dissNum][k];

    if (categories[k].innerHTML.length >= 6) {
      categories[k].style.fontSize = (textSize * 0.6) + "vh";
    }
  }
}

//Function that creates the amount that the size, margin, and text are shrunk by
//Set up so that the initial button has a size of about 0.5
function shrinkFactor() {
  var shrinkAmount = -Math.pow(1.9, -(0.56 * (startingShrink + dissNum))) + 1;
  return shrinkAmount;
}

//Function for creating the new buttons
function createButt(instances) {
  buttonSize = buttonSize * shrinkFactor();
  marginSize = marginSize * shrinkFactor();
  textSize = textSize * shrinkFactor();

  //Creating a new button
  var i;
  for (i = 0; i < instances; i++) {
    buttNum++;

    var splitButt = document.createElement("BUTTON");
    document.getElementById("divs").appendChild(splitButt);

    splitButt.setAttribute("onclick", "split(this.innerHTML)");
    splitButt.className = "flex_split";

    //Loops through all the buttons each time a new one is created
    //Upps the hue/colour for all, and sets all their colours (hsl)
    //Chance to assign random colour
    //Sets the size, margin, and text size for all
    //Chance to assign random size, margin, and text size
    var categories = document.getElementsByClassName("flex_split");
    for (j = 0; j < categories.length; j++) {
      categories[j].style.width = chaosChance(chaosReduction(buttonSize), buttonSize + "vh");
      categories[j].style.height = chaosChance(chaosReduction(buttonSize), buttonSize + "vh");
      categories[j].style.margin = chaosChance(chaosReduction(marginSize), marginSize + "vh");
      categories[j].style.fontSize = chaosChance(chaosReduction(textSize), textSize + "vh");

      var hue = 60 + (dissNum * 40);
      categories[j].style.backgroundColor = chaosChance(randColor(), "hsl("+hue+", 100%, 70%)");
      categories[j].style.color = chaosChance(randColor(), "black");

      var chaosFactor = Math.floor(Math.random() * ((80 * chaosRange) + 1));
      if (chaosFactor < dissNum && chaosFactor > 0) {
        categories[j].style.position = "absolute";
        categories[j].style.top = randPercent();
        categories[j].style.left = randPercent();
      }

      if (categories[j].innerHTML.length >= 6) {
        categories[j].style.fontSize = (textSize * 0.6) + "vh";
      }

      //console.log("Width: " + categories[j].style.width + " Height: " + categories[j].style.height + " Margin: " + categories[j].style.margin + " Font Size: " + categories[j].style.fontSize + " Colour: " + categories[j].style.backgroundColor);
    }
  }
}

//Generates the amount that the button would shrink by
function chaosReduction(size) {
  return (size - (size * (0.1 * Math.floor(Math.random() * 6)))) + "vh";
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

function randPercent() {
  return Math.floor(Math.random() * 101) + "%";
}

function addCheck(event) {
  if (event.keyCode == 13) {
    addNewCategory(document.getElementById("input").value);
    document.getElementById("input").value = "";
  }
}

function addNewCategory(name) {
  buttNum++;

  var splitButt = document.createElement("BUTTON");
  document.getElementById("divs").appendChild(splitButt);

  splitButt.setAttribute("onclick", "split(this.innerHTML)");
  splitButt.className = "flex_split";
  splitButt.innerHTML = name;

  categoryNames[dissNum].push(name);
  console.log(categoryNames);

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

  if (splitButt.innerHTML.length >= 6) {
    splitButt.style.fontSize = (textSize * 0.6) + "vh";
  }

  //console.log("Width: " + splitButt.style.width + " Height: " + splitButt.style.height + " Margin: " + splitButt.style.margin + " Font Size: " + splitButt.style.fontSize + " Colour: " + splitButt.style.backgroundColor);
}

function loadBranch(branchNum) {
  dissNum = branchNum;
  console.log(dissNum);
  split();
}
