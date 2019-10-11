var splitLvl = 1;

function split() {
  var i;
  for (i = 0; i < (splitLvl * 2); i++)
  {
    var splitDiv = document.createElement("DIV");
    document.body.appendChild(splitDiv);
    splitDiv.className = "flex_split"
    splitDiv.innerHTML = "TEST";
  }

  splitLvl++;
}
