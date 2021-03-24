var bio_needs = [100, 100, 100]; // eat, sleep, waste
var emo_needs = [100, 100, 100]; // socialize, seclude, cavort
var needs = [bio_needs, emo_needs];
var lrg_index = 0;
var sml_index = 0;

var lrg_decisons = [
  "Be born"
];
var sml_decisons = [
  "Go for a walk"
];

window.onload = function() {
  var rand = Math.floor(Math.random() * 10000);
  document.getElementById("name").innerHTML = "Test Subject #" + rand;
}

var updateNeeds = setInterval(function() {
  for (var i in needs) {
    for (var j in needs[i]) {
      needs[i][j] -= Math.floor(Math.random() * 11);
    }
  }

  for (var j = 0; j < 3; j++) {
    if (bio_needs[j] <= 50) {
      switch (j) {
        case 0:
          document.getElementById("bio").innerHTML = "Need to eat!";
          break;
        case 1:
          document.getElementById("bio").innerHTML = "Need to sleep!";
          break;
        case 2:
          document.getElementById("bio").innerHTML = "Need to waste!";
          break;
      }
    }
    if (emo_needs[j] <= 50) {
      switch (j) {
        case 0:
          document.getElementById("emo").innerHTML = "Need to socialize!";
          break;
        case 1:
          document.getElementById("emo").innerHTML = "Need to seclude!";
          break;
        case 2:
          document.getElementById("emo").innerHTML = "Need to cavort!";
          break;
      }
    }
  }

  //console.log("Bio: " + bio_needs[0] + " " + bio_needs[1] + " " + bio_needs[2] + "\nEmo: " + emo_needs[0] + " " + emo_needs[1] + " " + emo_needs[2]);
}, 1000);
