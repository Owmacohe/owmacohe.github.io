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

var gameIsStarted = false;

var bio_needs = [100, 100, 100]; // eat, sleep, waste
var emo_needs = [100, 100, 100]; // socialize, seclude, cavort
var needs = [bio_needs, emo_needs];

var lrg_decisons = [
  "Be born", // youth
  "Go to school",
  "Move out", // adulthood
  "Get a job",
  "Retire", // old age
  "Die",
  "Diffuse into the universe", // beyond
  "Grasp the full scale of the cosmos",
  "Finally, be at peace"
];
var sml_decisons = [
  "Make infant noises", // youth
  "Crawl around aimlessly",
  "Try to learn",
  "Be blissfully innocent",
  "Go for a walk", // adulthood
  "Let loneliness set in",
  "Settle into routine",
  "Find love",
  "Shed responsabilities", // old age
  "Surrender to mediocraty",
  "Go silently",
  "Begin to decompose",
  "Become a part of the water cylce", // beyond
  "Struggle against loss of self",
  "Travel into the cosmos",
  "Amass all conceivable information",
  "Observe the heat death of the universe",
  "Begin again?"
];
var lrg_index = 0;
var sml_index = 0;

var gameTime = 0;
var gameSpeed = 1;
var increaseGameSpeed = setInterval(function() {
  if (gameIsStarted) {
    gameTime++;

    if (gameTime >= 90) {
      document.getElementById("subjectImg").setAttribute("src", "subject/CART212_7.png");
      gameIsStarted = false;
    }

    gameSpeed += 0.05;
    gameSpeed = Math.round(gameSpeed * 100) / 100;

    document.getElementById("time").innerHTML = "Time: " + gameTime + "s, Speed: " + gameSpeed;
  }
}, 1000);

window.onload = function() {
  var rand = Math.floor(Math.random() * 10000);
  document.getElementById("name").innerHTML = "Test Subject #" + rand;
}

function increaseNeeds(array, index) {
  if (gameIsStarted) {
    array[index] = 100;

    if (array == bio_needs) {
      document.getElementById("bio").innerHTML = "";
    }
    else if (array == emo_needs) {
      document.getElementById("emo").innerHTML = "";
    }
  }
}

var decreaseNeeds = setInterval(function() {
  if (gameIsStarted) {
    for (var i in needs) {
      for (var j in needs[i]) {
        needs[i][j] -= Math.floor(Math.random() * (2 * gameSpeed));
      }
    }
  }
}, 1000);

var checkNeeds = setInterval(function() {
  if (gameIsStarted) {
    for (var i in needs) {
      for (var j in needs[i]) {
        if (needs[i][j] <= 50) {
          if (i == 0 && j == 0) { document.getElementById("bio").innerHTML = "Need to eat!"; }
          if (i == 0 && j == 1) { document.getElementById("bio").innerHTML = "Need to sleep!"; }
          if (i == 0 && j == 2) { document.getElementById("bio").innerHTML = "Need to waste!"; }

          if (i == 1 && j == 0) { document.getElementById("emo").innerHTML = "Need to socialize!"; }
          if (i == 1 && j == 1) { document.getElementById("emo").innerHTML = "Need to seclude!"; }
          if (i == 1 && j == 2) { document.getElementById("emo").innerHTML = "Need to cavort!"; }
        }
      }
    }

    console.log("Bio: " + bio_needs[0] + " " + bio_needs[1] + " " + bio_needs[2] + "\nEmo: " + emo_needs[0] + " " + emo_needs[1] + " " + emo_needs[2]);
  }
}, 1000);

var checkDecisions = setInterval(function() {
  if (gameIsStarted) {
    if ((lrg_index * 10) < gameTime) {
      document.getElementById("lrg").innerHTML = lrg_decisons[lrg_index];

      switch (lrg_index) {
        case 0:
          document.getElementById("subjectImg").setAttribute("src", "subject/CART212_1.png");
          break;
        case 2:
          document.getElementById("subjectImg").setAttribute("src", "subject/CART212_2.png");
          break;
        case 4:
          document.getElementById("subjectImg").setAttribute("src", "subject/CART212_3.png");
          break;
        case 6:
          document.getElementById("subjectImg").setAttribute("src", "subject/CART212_4.png");
          break;
        case 7:
          document.getElementById("subjectImg").setAttribute("src", "subject/CART212_5.png");
          break;
        case 8:
          document.getElementById("subjectImg").setAttribute("src", "subject/CART212_6.png");
          break;
      }
    }

    if ((sml_index * 5) < gameTime) {
      document.getElementById("sml").innerHTML = sml_decisons[sml_index];
    }

    console.log("LRG: " + lrg_decisons[lrg_index] + "\nSML: " + sml_decisons[sml_index]);
  }
}, 1000);

function decide(size, isYes) {
  if (gameIsStarted) {
    if (size == "lrg") {
      if (isYes) {
        lrg_index++;
        document.getElementById("lrg").innerHTML = "";
      }
      else {
        lrg_index++;
        document.getElementById("lrg").innerHTML = "";
      }
    }
    else if (size == "sml") {
      if (isYes) {
        sml_index++;
        document.getElementById("sml").innerHTML = "";

        if (sml_index >= 17) {
          window.location.reload(true);
        }
      }
      else {
        sml_index++;
        document.getElementById("sml").innerHTML = "";
      }
    }
  }
}
