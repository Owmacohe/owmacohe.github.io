var order = [
  ["universe", 1, "the"],
  ["galaxy cluster", 50, "spherical", "oblong", "irregular"],
  ["galaxy", 25, "spiral", "barred spiral", "irregular", "lenticular"],
  ["system cluster", 50, "spherical", "oblong", "irregular"],
  ["solar system", 25, "single-starred", "multi-starred"],
  ["planet", 10, "gas", "rocky", "liquid", "hybrid"],
  ["continent", 5, "northern", "equatorial", "southern"],
  ["region", 5, "mountainous", "forested", "island", "swamp", "populated", "plains", "desert", "icy"],
  ["location", 3, "valley", "peak", "steppe", "building", "cave", "path", "slope", "field", "waterfall"]
];

var currentLayerTab = 0;

createLayer([0, 0]);

function createLayer(progenitor) {
  var prog = document.getElementById("tab_" + progenitor[0] + "_" + progenitor[1]);

  if (prog.hasChildNodes() == false || progenitor[0] == 0) {
    for (var i = 0; i < Math.floor(Math.random() * order[progenitor[0]][1]) + 1; i++) {
      var temp = progenitor[0] + 1;
      currentLayerTab++;
      var thisTab = [temp, currentLayerTab];

      if (progenitor[0] != order.length) {
        createTab(progenitor, thisTab);
      }
    }
  }
}

function createTab(progenitor, thisTab) {
  var marg;

  if (thisTab[0] == 1) {
    marg = 0;
  }
  else {
     marg = (thisTab[0] + 2);
  }

  var newGroup = document.createElement("DIV");
  newGroup.style.marginLeft = marg + "vw";
  document.getElementById("tab_" + progenitor[0] + "_" + progenitor[1]).appendChild(newGroup);

  var newButton = document.createElement("BUTTON");
  newButton.setAttribute("class", "accordion");
  newButton.setAttribute("onclick", "createLayer([" + thisTab[0] + ", " + thisTab[1] + "])");
  newButton.innerHTML = order[progenitor[0]][Math.floor(Math.random() * (order[progenitor[0]].length - 2)) + 2] + " " + order[progenitor[0]][0];
  newButton.addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    panel.style.transition = "2.5s";
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = (panel.scrollHeight * 2) + "vw";
    }
  });
  newGroup.appendChild(newButton);

  var newTab = document.createElement("DIV");
  newTab.setAttribute("id", "tab_" + thisTab[0] + "_" + thisTab[1]);
  newTab.style.backgroundColor = "hsla(0, 0%, 100%, 0.2)";
  newTab.style.paddingRight = "1vw";
  newGroup.appendChild(newTab);
}
