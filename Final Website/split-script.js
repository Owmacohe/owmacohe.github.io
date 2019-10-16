var divNum = 0;

function split() {
  if (divNum == 0)
  {
    createDiv(2);
  }
  else if (divNum > 0)
  {
    createDiv(divNum);
  }

  console.log("Number of divs created: " + divNum);
}

function createDiv(instances) {
  var i;
  for (i = 0; i < instances; i++)
  {
    divNum++;

    var splitButt = document.createElement("BUTTON");
    document.getElementById("divs").appendChild(splitButt);

    //splitButt.onclick 

    splitButt.className = "flex_split";
    splitButt.style.backgroundColor = randColor();
  }
}

function randColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";

  for (i = 0; i < 6; i++)
  {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
