/*

0-30 seconds: Tutorial
  - 0-10 seconds: overview
  - 10-20 seconds: needs descriptions
  - 20-30 seconds: decision descriptions
30-90 seconds: Rising action
  - 0-20 seconds: youth
  - 20-40 seconds: adulthood
  - 40-60 seconds: old age
90-120 seconds: Climax ending
  - 0-10 seconds: Unatainable needs
  - 10-20 seconds: Indecipherable decisions
  - 20-30 seconds: Complete loss of control

*/

var bio_needs = [100, 100, 100]; // eat, sleep, waste
var emo_needs = [100, 100, 100]; // socialize, seclude, cavort
var needs = [bio_needs, emo_needs];

var lrg_decisons = [
  "Be born"
];
var sml_decisons = [
  "Go for a walk"
];
var lrg_index = 0;
var sml_index = 0;

var gameTime = 0;
var gameSpeed = 1;
var increaseGameSpeed = setInterval(function() {
  gameTime++;
  gameSpeed += 1/8;
}, 1000);

window.onload = function() {
  var rand = Math.floor(Math.random() * 10000);
  document.getElementById("name").innerHTML = "Test Subject #" + rand;
}

function increaseNeeds(array, index) {
  array[index] += 50;

  for (var i = 0; i < 3; i++) {
    if (bio_needs[i] >= 110) {
      switch (i) {
        case 0:
          document.getElementById("bio").innerHTML = "Too much food!";
          break;
        case 1:
          document.getElementById("bio").innerHTML = "Too much sleep!";
          break;
        case 2:
          document.getElementById("bio").innerHTML = "No need to waste!";
          break;
      }
    }
    if (emo_needs[i] >= 110) {
      switch (i) {
        case 0:
          document.getElementById("emo").innerHTML = "Too much socializing!";
          break;
        case 1:
          document.getElementById("emo").innerHTML = "Too much secluding!";
          break;
        case 2:
          document.getElementById("emo").innerHTML = "No need to cavort!";
          break;
      }
    }
  }
}

var decreaseNeeds = setInterval(function() {
  for (var i in needs) {
    for (var j in needs[i]) {
      needs[i][j] -= Math.floor(Math.random() * (2 * gameSpeed));
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
