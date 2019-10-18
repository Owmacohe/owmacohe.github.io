var buttNum = 0;
var dissNum = 0;

var buttonSize = 90;
var marginSize = 6;
var startingShrink = 2;

function split() {
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

function shrinkFactor() {
  var shrinkAmount = -Math.pow(2, -(0.56 * (startingShrink + dissNum))) + 1;
  console.log((startingShrink + dissNum) + " " + shrinkAmount);
  return shrinkAmount;
}

function createButt(instances) {
  buttonSize = buttonSize * shrinkFactor();
  marginSize = marginSize * shrinkFactor();

  var i;
  for (i = 0; i < instances; i++)
  {
    buttNum++;

    var splitButt = document.createElement("BUTTON");
    document.getElementById("divs").appendChild(splitButt);

    splitButt.setAttribute("onclick", "split()");
    splitButt.className = "flex_split";

    var categories = document.getElementsByClassName("flex_split");
    for (j = 0; j < categories.length; j++)
    {
      var hue = 60 + (dissNum * 40);
      categories[j].style.backgroundColor = "hsl("+hue+", 100%, 70%)";

      categories[j].style.width = buttonSize + "vh";
      categories[j].style.height = buttonSize + "vh";
      categories[j].style.margin = marginSize + "vh";
    }

    //console.log("# of buttons: " + buttNum + ", button size: " + buttonSize);
    //console.log(dissNum + " " + buttonSize);
  }
}

/*
function randColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";

  for (i = 0; i < 6; i++)
  {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
*/

//Exponential creation
/*
function split() {
  if (buttNum == 0)
  {
    createButt(4);
  }
  else if (buttNum > 0)
  {
    createButt(buttNum * 3);
    document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
  }

  dissNum++;
}
*/
