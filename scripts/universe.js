var order = [
  ["galaxy cluster", 50, "spherical", "oblong", "irregular"],
  ["galaxy", 25, "spiral", "barred spiral", "irregular", "lenticular"],
  ["system cluster", 50, "spherical", "oblong", "irregular"],
  ["solar system", 25, "single-starred", "multi-starred"],
  ["planet", 10, "gas", "rocky", "liquid", "hybrid"],
  ["continent", 5, "northern", "equatorial", "southern"],
  ["region", 5, "mountainous", "forested", "island", "swamp", "populated", "plains", "desert", "icy"],
  ["location", 3, "specific valley", "specific peak", "specific steppe", "specific building", "specific cave", "specific path", "specific slope", "specific field", "specific tree", "specific waterfall"]
];

var currentLayerTab = 0;

createUniverse();

function createUniverse() {
  createLayers([0, 0]);
}

function createLayers(progenitor) {
  for (var i = 0; i < Math.floor(Math.random() * order[progenitor[0]][1]) + 1; i++) {
    createTab(progenitor);
  }
}

function createTab(progenitor) {
  var temp = progenitor[0] + 1;
  currentLayerTab++;
  var thisTab = [temp, currentLayerTab];

  tabMargin = (thisTab[0] + 5) + "vw";

  var newRow = document.createElement("DIV");
  newRow.setAttribute("class", "flexrow");
  newRow.style.marginLeft = tabMargin;
  document.getElementById("tab_" + progenitor[0] + "_" + progenitor[1]).appendChild(newRow);

  var newButton = document.createElement("BUTTON");
  newButton.setAttribute("data-toggle", "collapse");
  newButton.setAttribute("data-target", "#tab_" + thisTab[0] + "_" + thisTab[1]);
  newButton.innerHTML = order[progenitor[0]][Math.floor(Math.random() * (order[progenitor[0]].length - 2)) + 2] + " " + order[progenitor[0]][0];
  newRow.appendChild(newButton);

  newRow.innerHTML += "test";

  var newTab = document.createElement("DIV");
  newTab.setAttribute("id", "tab_" + thisTab[0] + "_" + thisTab[1]);
  newTab.setAttribute("class", "collapse");
  newTab.style.marginLeft = tabMargin;
  document.getElementById("tab_" + progenitor[0] + "_" + progenitor[1]).appendChild(newTab);

  if (progenitor[0] != order.length - 1) {
    createLayers(thisTab);
  }
}

function createDescription() {
  //TODO
}
