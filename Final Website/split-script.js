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

//Function that is called when the user selects a category
function split() {
  //Gradual button creation
  if (buttNum == 0) {
    createButt(1);
  }
  else if (buttNum == 1)
  {
    dissNum++;

    createButt(3);
    document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
  }
  else if (buttNum >= 4) {
    dissNum++;

    createButt(4);
    document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
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
  for (i = 0; i < instances; i++)
  {
    buttNum++;

    var splitButt = document.createElement("BUTTON");
    document.getElementById("divs").appendChild(splitButt);

    splitButt.setAttribute("onclick", "split()");
    splitButt.className = "flex_split";

    //Loops through all the buttons each time a new one is created
    //Upps the hue/colour for all, and sets all their colours (hsl)
    //Chance to assign random colour
    //Sets the size, margin, and text size for all
    //Chance to assign random size, margin, and text size
    var categories = document.getElementsByClassName("flex_split");
    for (j = 0; j < categories.length; j++)
    {
      categories[j].style.width = chaosChance(chaosReduction(buttonSize), buttonSize + "vh");
      categories[j].style.height = chaosChance(chaosReduction(buttonSize), buttonSize + "vh");
      categories[j].style.margin = chaosChance(chaosReduction(marginSize), marginSize + "vh");
      categories[j].style.fontSize = chaosChance(chaosReduction(textSize), textSize + "vh");

      var hue = 60 + (dissNum * 40);
      categories[j].style.backgroundColor = chaosChance(randColor(), "hsl("+hue+", 100%, 70%)");

      var chaosFactor = Math.floor(Math.random() * ((80 * chaosRange) + 1));
      if (chaosFactor < dissNum && chaosFactor > 0) {
        categories[j].style.position = "absolute";
        categories[j].style.top = randPercent();
        categories[j].style.left = randPercent();
      }
      else {
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

//For adding text to buttons as they are created
/*
var categories = document.getElementsByClassName("flex_split");
for (j = 0; j < categories.length; j++)
{
  switch (dissNum) {
    case 0:
      break;
    case 1:
      break;
  }
}
*/

//Simplified random effects method and called function
/*
chaosCreator(categories[j].style.backgroundColor, randColor(), "hsl("+hue+", 100%, 70%)");

function chaosCreator(sty, rand, def) {
  var chaosFactor = Math.floor(Math.random() * (chaosRange + 1));
  if (chaosFactor < dissNum && chaosFactor > 0) {
    sty = rand;
  }
  else {
    sty = def;
  }

  console.log("Style: " + sty + " Random: " + rand + " Default: " + def);
}
*/

//Exponential creation
/*
function split() {
  if (buttNum == 0)
  {
    createButt(1);
  }
  else if (buttNum > 0)
  {
    createButt(buttNum);
    document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
  }

  dissNum++;
}
*/
