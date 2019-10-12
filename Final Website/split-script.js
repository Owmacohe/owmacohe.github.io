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

  console.log("Number of created divs: " + divNum);
}

function createDiv(instances) {
  var i;
  for (i = 0; i < instances; i++)
  {
    var splitDiv = document.createElement("DIV");
    document.getElementById("divs").appendChild(splitDiv);

    splitDiv.className = "flex_split";

    divNum++;
  }
}
