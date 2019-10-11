var splitLvl = 1;

function split(splitLvl) {
  var i;
  for (i = 0; i < (splitLvl * 2); i++)
  {
    var splitDiv = document.createElement("DIV");
    splitDiv.class = "flex_split";
  }
}
