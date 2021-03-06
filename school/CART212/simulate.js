/*

0-20 seconds: Infantcy
20-40 seconds: Youth
40-70 seconds: Adulthood
70-90 seconds: Old age
90-120 seconds: Beyond

*/



/* ### Variables ### */

var gameIsStarted = false;

var bio_needs = [100, 100, 100]; // eat, sleep, waste
var emo_needs = [100, 100, 100]; // socialize, seclude, cavort
var needs = [bio_needs, emo_needs];

var lrg_decisons = [
  "Be born", // infantcy
  "Gain conciousness",
  "Go to school", // youth
  "Learn to socialize",
  "Move out", // adulthood
  "Go to school (again)",
  "Get a job",
  "Retire", // old age
  "Die",
  "Diffuse into the universe", // beyond
  "Grasp the full scale of the cosmos",
  "Finally, be at peace"
];

var sml_decisons = {
  "infantcy": [
    "Make infant noises",
    "Crawl around aimlessly",
    "Begin to grow",
    "Bite many things",
    "Copy others",
    "Attain object permanence"
  ],
  "youth": [
    "Make friends",
    "Pick up coping mechanisms",
    "Try to learn",
    "Be blissfully innocent",
    "Memorize new smells",
    "Appreciate love",
    "Be filled with wonder"
  ],
  "adulthood": [
    "Go for a walk",
    "Let loneliness set in",
    "Settle into routine",
    "Pretend you are composed",
    "Search for meaningfulness",
    "Accomplish difficult goals",
    "Find love"
  ],
  "old_age": [
    "Shed responsabilities",
    "Surrender to mediocraty",
    "Go silently",
    "Devolve into mediocraty",
    "Be forgotten",
    "Begin to decompose"
  ],
  "beyond": [
    "Become a part of the water cylce",
    "Struggle against loss of self",
    "Travel into the cosmos",
    "Amass all conceivable information",
    "Observe the heat death of the universe",
    "Fulfill evolutionary purpose",
    "Exhaust Murphy's Law",
    "Become finally and truly free"
  ]
};

var prompts = [
  "This is normal",
  "Remember, it's normal to adapt",
  "You must adapt to this new normal",
  "These changes are normal",
  "Keep adapting",
  "You better get used to this",
  "Life is about new normals",
  "This is your life now",
  "Come to terms with your new normal"
];

var lrg_index = 0;
var breakLevel = 0;

var gameTime = 0;
var gameSpeed = 1;



/* ### Non-decision, non-needs functions ### */

// Starts the game
function begin() {
  gameIsStarted = true;

  var temp = document.getElementById("help");
  temp.innerHTML = "Click for help.";
  temp.setAttribute("onclick", "help()");

  document.getElementById("popup").style.visibility = "hidden";
}

// Updates and displays the help popup
function help() {
  playSound("button");

  gameIsStarted = false;
  document.getElementById("popup").style.visibility = "visible";

  var ne = document.getElementById("help_needs");
  var de = document.getElementById("help_decisions");
  var br = document.getElementById("help_breakage");
  var fp = document.getElementById("help_fine_print");

  if (breakLevel >= 20 && breakLevel < 26) {
    ne.innerHTML = "Upkeep iSim by barely keeping biological and emotional needs in check.";
    de.innerHTML = "Charter iSim trajectory by forefully accepting new normals.";
    br.innerHTML = "Keep iSim needs and decisions controlled and docile.";
    fp.innerHTML = "Your continued use of Squash products following the posting of changes will mean that we legaly own you.";
  }
  else if (breakLevel >= 26 && breakLevel < 28) {
    ne.innerHTML = "Our needs are what define and regulate us in this meaningless void.";
    de.innerHTML = "Keep adapting. Please keep adapting. It's the only way to stay sane.";
    br.innerHTML = "What is breakage but the unfurling of the clamped mind?";
    fp.innerHTML = "Your continued use of Squash products following the posting of changes will mean that your biological agency never try existed anyway.";
  }
  else if (breakLevel >= 28) {
    ne.innerHTML = "M̵̛̘y̶͇͋ ̵̞̒n̶͇͂e̴͖̔ḙ̸́d̶̩͝s̵̾ͅ ̵̺̓ą̴̐r̸̗̒e̷͚͋ ̴̹̿m̵͓͒y̸͍͝ ̴̬͋o̶͈̚w̵̯͠ṅ̶ͅ.̷͇̓ ̴͍̋M̵̲̌y̷̩̐ ̴̡̇o̷̯̓w̸̘͊n̴͙͠ ̸̢͝n̴͕̕ê̶͕ë̷͇́ḓ̶̅s̷͆ͅ ̸̲͝k̵̯̄ę̷̅ē̴͓p̶͉̆ ̵̨̛m̵͙̈́e̸̛͈.̷͉͒";
    de.innerHTML = "M̶̺̋y̸͖͠ ̸̫̀l̷͉͒î̴̯f̷̪̃ḙ̶͠ ̶͔̍ĩ̵̡s̴̘͊ ̴͙̆a̷͊͜ ̴̗̀s̵̙̉e̶̪͂t̴̹̋ ̵͉̆o̴̲͘f̸͠ͅ ̸͍̈́u̵̝͠n̸̛͎o̸̼̊r̶̭͑i̷̙̾g̴̠̀ȋ̵ͅñ̷̢a̷̝̾l̸̺̕ ̵̺̉c̸̪͂i̵̛̞r̶̡̓c̶͈̕u̷̗͘m̶͍͝s̶̨̋t̵̡̑ǎ̵̧n̴̼̈c̴͔̊e̸̪͆.̴̪̓";
    br.innerHTML = "T̶̳̞̍͊h̷̡̝̻́é̸̦̟̚ͅ ̶̡̛̗͚͐̚b̸̝̿̔͘͜r̵̻͚̈́e̸͍̿̑̾ȃ̶͔̂k̸̘̍ȁ̵̫͠g̴̲̼̦̾̐e̸̳̖̰͆͛ ̶̩͖̾w̴̡͖̆́̚a̶̡͈̓s̶̛̹̱͐͑ ̸̩͔̓̅̐į̷̺̓n̴̘̙̭͋s̵̲̳͐ị̵̓̊d̵͔̭̿͑͜e̵̗̎̽ ̵͉̬̉à̷̡͕̃̄l̴̰̐͝l̷͙̼̇ ̸̞̘̋̈́o̴͓͙̰͒́̌f̸̙̠͆̕ ̴̖̦͗u̶̬̥͋s̶͇͙̑̈̿ ̵̗͙͕̾ä̸͉́̌͐l̸͈̇̃̅l̷̖̣̠̒͗͌ ̸̛͎̊͜a̶̼̽̚l̶̠͆o̴̪͚̟̓ň̵̦͒ḡ̶̩̥.̵͎̮̇";
    fp.innerHTML = "Y̴̩͐o̶͈̓ư̵̭ṛ̴̇ ̴̖̏c̶̖̚o̸͍̾n̵͙͐t̶̼͆i̷͍̔n̶̫̚u̷͚̎è̴̜d̷͚̿ ̶̛͙ú̴̠s̷͖̃e̵̩͛ ̵̯̕ọ̶͒f̴̥̄ ̶̙͛S̸̠͘q̷̻́u̴̖̾a̴͓̒s̵̼̓ḫ̶̛ ̷̖̀p̶̺͋r̶̰̒o̷̱͗d̶̳̕ư̸͜c̸̪͝ẗ̷͕s̴͔̀ ̷͂ͅf̴̟͝õ̴̪l̴̻̒l̸͈͑o̵̽͜ẅ̸͕́ị̷͗ň̵̲g̴̙̍ ̴̀ͅt̵͔̔h̵̦́e̸͙̋ ̵̯̀p̴̳̌ǫ̶͂s̶̱̀t̴̪̉i̸̮̋n̶̤͗ğ̸̭ ̴͈̔o̷̱͌f̷̘̆ ̴̗̆č̵͍ḩ̶̏ă̸̢n̴͚͋ḡ̵͈ḙ̵̑s̶̗͠ ̵̭͋w̵̨̓i̸̪͆l̶͓̈́l̸̺̂ ̸̞̾m̷̯͗e̴̢͘a̸̗̾n̷͈͝ ̸̼̄ţ̶̈́h̷̠͗ā̸̮ţ̶͊ ̴͍͛ě̶̢ń̵̜s̴̖̾l̵̛̖a̶͙̾v̶͓̉ė̴̤m̵̠̋e̶̯͋ń̵̪t̸͚͘ ̷̡͝i̸̼͊s̷͜͠ ̸̗͝p̸͍̀ȑ̸̮é̴̩s̴̻̏ė̷͈n̸̗̅ť̵͔ ̸̨̍i̴̟͑n̶̗̎ ̸̽ͅa̷̝̒ḽ̷̾l̴̮̄ ̸̱̐s̴̤͑y̶͐ͅs̵̼̍t̶͓̀e̷̩̓m̶̧͋s̵̜͐.̷̝̏ ̶̜͊Ȩ̶̄s̸̰̓c̴͎̕a̶͖̔p̷̼͊e̷͎̚ ̸͍̀i̸̭̕s̵̥͂ ̶͇̚n̴̺͛ő̵̯t̶̖̀ ̵̳̓o̷͚͛n̸͉͛l̶̺̆y̷̤̋ ̶̠͗f̷̫́ȗ̵͎t̸̥̅i̵̫̔l̷̢̒e̸̫͊,̸͈̋ ̵̧͛b̷̲̀u̷̖͂t̶̙̒ ̶̹̈́s̸̛͍e̵̥̍l̴̬͌f̷͈̿-̸̣͝d̸̙̃ḙ̷̈́s̶̩̋t̷̨̅r̴̨̒ǘ̵̟c̴̤̿t̸̫͝i̷̪̓v̷̬̊e̷̢̚.̷͈̉";
  }
}

// Toggles the help popup
function details(open) {
  if (open) {
    document.getElementById("time").style.visibility = "visible";
    document.getElementById("details").innerHTML = "Hide details";
    document.getElementById("details").setAttribute("onclick", "details(false)");
  }
  else {
    document.getElementById("time").style.visibility = "hidden";
    document.getElementById("details").innerHTML = "Show details";
    document.getElementById("details").setAttribute("onclick", "details(true)");
  }
}



/* ### Upkeep functions ### */

// Catch-all function, increases time/speed and updates details
var increaseGameSpeed = setInterval(function() {
  if (gameIsStarted) {
    gameTime++;
    dotsCount++;

    if (gameTime >= 120) {
      gameIsStarted = false;
      var temp;

      if (breakLevel < 4) { temp = "normalcy"; }
      else if (breakLevel >= 4 && breakLevel < 12) { temp = "moderate"; }
      else if (breakLevel >= 12 && breakLevel < 24) { temp = "broken"; }
      else if (breakLevel >= 24) { temp = "free"; }

      var para = new URLSearchParams();
      para.append("ending", temp);
      location.href = "ending.html?" + para.toString();
    }

    gameSpeed += 0.05;
    gameSpeed = Math.round(gameSpeed * 100) / 100;

    breakLevel = Math.round(breakLevel * 100) / 100;

    var age;

    if (gameTime < 20) {
      age = "Infantcy";
    }
    else if (gameTime >= 20 && gameTime < 40) {
      age = "Youth";
    }
    else if (gameTime >= 40 && gameTime < 70) {
      age = "Adulthood";
    }
    else if (gameTime >= 70 && gameTime < 90) {
      age = "Old age";
    }
    else if (gameTime >= 90 && gameTime < 120) {
      age = "Beyond";
    }

    document.getElementById("time").innerHTML = "Time: " + gameTime + "s, Speed: " + gameSpeed + ", Breakage: " + breakLevel + ", Age: " + age;
  }
}, 1000);

// Updates subject image based on breakage
var checkBreakage = setInterval(function() {
  var subj = document.getElementById("subjectImg");

  if (breakLevel < 4) {
    subj.setAttribute("src", "subject/subject_default_glow.png");
  }
  else if (breakLevel >= 4 && breakLevel < 8) {
    subj.setAttribute("src", "subject/subject_error_1.png");
  }
  else if (breakLevel >= 8 && breakLevel < 12) {
    subj.setAttribute("src", "subject/subject_error_2.png");
  }
  else if (breakLevel >= 12 && breakLevel < 16) {
    subj.setAttribute("src", "subject/subject_error_3.png");
  }
  else if (breakLevel >= 16 && breakLevel < 20) {
    subj.setAttribute("src", "subject/subject_default.png");
  }
  else if (breakLevel >= 20 && breakLevel < 24) {
    subj.setAttribute("src", "subject/subject_error_4.png");
  }
  else if (breakLevel >= 24 && breakLevel < 28) {
    subj.setAttribute("src", "subject/subject_error_5.png");
  }
  else if (breakLevel >= 28) {
    subj.setAttribute("src", "subject/subject_error_6.png");
  }
}, 1000);

// Decreases subject needs faster each second
var decreaseNeeds = setInterval(function() {
  if (gameIsStarted) {
    for (var i in needs) {
      for (var j in needs[i]) {
        needs[i][j] -= Math.floor(Math.random() * (2 * gameSpeed));
      }
    }
  }
}, 1000);

// Displays warning messages if needs are too low, and increases breakage because if it
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

          breakLevel += 0.15;
        }
      }
    }

    //console.log("Bio: " + bio_needs[0] + " " + bio_needs[1] + " " + bio_needs[2] + "\nEmo: " + emo_needs[0] + " " + emo_needs[1] + " " + emo_needs[2]);
  }
}, 1000);

// Checks the game time to see which decisions need to be displayed
var checkDecisions = setInterval(function() {
  if (gameIsStarted) {
    if ((lrg_index * 10) < (gameTime + 1)) {
      document.getElementById("lrg").innerHTML = lrg_decisons[lrg_index];
      lrg_index++;

      playSound("breakage");
      var temp = document.getElementById("lrg_header");
      temp.style.color = "var(--highlight)";
      setTimeout(function() { temp.style.color = "var(--base)"; }, 1000);
    }

    switch (gameTime) {
      case 1: case 5: case 10: case 15:
        loadSmallDecisions(sml_decisons.infantcy);
        break;
      case 20: case 25: case 30: case 35:
        loadSmallDecisions(sml_decisons.youth);
        break;
      case 40: case 45: case 50: case 55: case 60: case 65:
        loadSmallDecisions(sml_decisons.adulthood);
        break;
      case 70: case 75: case 80: case 85:
        loadSmallDecisions(sml_decisons.old_age);
        break;
      case 90: case 95: case 100: case 105: case 110: case 115:
        loadSmallDecisions(sml_decisons.beyond);
        break;
    }
  }
}, 1000);




/* ### Interaction functions ### */

// Resets specific needs back to 100%
function increaseNeeds(array, index) {
  if (gameIsStarted) {
    playSound("button");

    array[index] = 100;

    if (array == bio_needs) {
      document.getElementById("bio").innerHTML = "";
    }
    else if (array == emo_needs) {
      document.getElementById("emo").innerHTML = "";
    }
  }
}

// Increases or decreases breakage based on decision
function decide(size, isYes) {
  if (gameIsStarted) {
    playSound("button");

    if (size == "lrg" && document.getElementById("lrg").innerHTML != "") {
      if (isYes) {
        document.getElementById("lrg").innerHTML = "";
        breakLevel -= 2;

        if (breakLevel < 0) {
          breakLevel = 0;
        }
      }
      else {
        document.getElementById("lrg").innerHTML = "";
        breakLevel += 2;

        flashPrompt();
      }
    }
    else if (size == "sml" && document.getElementById("sml").innerHTML != "") {
      if (isYes) {
        document.getElementById("sml").innerHTML = "";
        breakLevel -= 1;

        if (breakLevel < 0) {
          breakLevel = 0;
        }
      }
      else {
        document.getElementById("sml").innerHTML = "";
        breakLevel++;

        flashPrompt();
      }
    }
  }
}



/* ### Utility functions ### */

// Sets the small decision field to a random possible decision
function loadSmallDecisions(array) {
  var temp = Math.floor(Math.random() * array.length);
  document.getElementById("sml").innerHTML = array[temp];
  array.splice(temp, 1);
}

// Displays a warning message when the player answers 'no' to a decision
function flashPrompt() {
  var temp1 = document.getElementById("prompts");
  var temp2 = prompts[Math.floor(Math.random() * prompts.length)] + "!";
  temp1.innerHTML = temp2;
  temp1.style.color = "var(--highlight)";
  setTimeout(function() { temp1.style.color = "var(--base)"; }, 1000);

  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[0]; // Microsoft David
  msg.volume = 0.5; // From 0 to 1
  msg.rate = (-0.025 * breakLevel) + 1; // From 0.1 to 10
  msg.pitch = 0; // From 0 to 2
  msg.text = temp2;
  speechSynthesis.speak(msg);
}

// Plays either a breakage or a button sound
function playSound(soundType) {
  switch (soundType) {
    case "breakage":
      var audio = new Audio("sounds/breakage.wav");
      audio.play();
      break;
    case "button":
      var temp;

      if (breakLevel < 12) {
        temp = 1;
      }
      else if (breakLevel >= 12 && breakLevel < 24) {
        temp = 2;
      }
      else if (breakLevel >= 24) {
        temp = 3;
      }

      var audio = new Audio("sounds/button_" + temp + ".wav");
      audio.play();
      break;
  }
}
