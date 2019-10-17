var buttNum = 0;
var dissNum = 0;

var buttonSize = 60;
var marginSize = 6;

function split() {
  if (buttNum == 0)
  {
    createDiv(4);
  }
  else if (buttNum > 0)
  {
    createDiv(buttNum * 3);
    document.getElementById("title").innerHTML = "Levels of dissolution: " + dissNum;
  }

  dissNum++;
}

function createDiv(instances) {
  buttonSize = buttonSize / 2;
  marginSize = marginSize / 2;

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

      //categories[j].style.width = (parseInt(categories[j].style.width) / 2) + "vw";
      //categories[j].style.height = (parseInt(categories[j].style.height) / 2) + "vw";
    }

    console.log("# of buttons: " + buttNum);
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

/*
var wid = document.getElementsByClassName("flex_split").style.width;
var hei = document.getElementsByClassName("flex_split").style.height;
wid = (wid / 2) + "vw";
hei = (hei / 2) + "vw";
*/
