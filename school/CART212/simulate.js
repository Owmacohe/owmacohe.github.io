/*
var dotsCount = 0; //Number of dots on-screen
const DOTSOPACITY = 75; //Highest possible opacity chance

//New dot every 50 milliseconds
var dotCount = setInterval(function() {
  try {
    if (gameIsStarted) {
      //Deletes old dots (as so not to clutter up the screen)
      for (var i = 0; i < document.getElementsByClassName("backDots").length; i++) {
        document.getElementsByClassName("backDots")[i].remove();
      }

      for (var j = 0; j < dotsCount; j++) {
        var newDot = document.createElement("DIV");
        document.body.appendChild(newDot);
        newDot.setAttribute("class", "backDots");
        //Gives it a random position and opacity
        newDot.setAttribute("style",
            "position: absolute; z-index: -1;" +
            " left: " + Math.floor(Math.random() * 99) + "vw;" +
            " top: " + Math.floor(Math.random() * 55) + "vw;" +
            " opacity: " + Math.floor(Math.random() * DOTSOPACITY) + "%;");
        newDot.innerHTML = ".";

        //Possible chance to become a different colour
        var rand = Math.floor(Math.random() *3);
        switch (rand) {
          case 0:
            newDot.style.color = "var(--contrast)";
            break;
        }
      }
    }
  }
  catch(err) {
    return;
  }
}, 50);
*/

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

var sml_decisons = {
  "youth": [
    "Make infant noises",
    "Crawl around aimlessly",
    "Try to learn",
    "Be blissfully innocent",
    "Begin to gain conciousness",
    "Memorize new smells",
    "Appreciate love",
    "Be filled with wonder"],
  "adulthood": [
    "Go for a walk",
    "Let loneliness set in",
    "Settle into routine",
    "Pretend you are composed",
    "Search for meaningfulness",
    "Accomplish difficult goals",
    "Find love"],
  "old_age": [
    "Shed responsabilities",
    "Surrender to mediocraty",
    "Go silently",
    "Devolve into mediocraty",
    "Be forgotten",
    "Begin to decompose"],
  "beyond": [
    "Become a part of the water cylce",
    "Struggle against loss of self",
    "Travel into the cosmos",
    "Amass all conceivable information",
    "Observe the heat death of the universe",
    "Fulfill evolutionary purpose",
    "Exhaust Murphy's Law",
    "Become finally and truly free"]
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

function begin() {
  gameIsStarted = true;

  var temp = document.getElementById("help");
  temp.innerHTML = "Click for help.";
  temp.setAttribute("onclick", "help()");

  document.getElementById("popup").style.visibility = "hidden";
}

function help() {
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

var increaseGameSpeed = setInterval(function() {
  if (gameIsStarted) {
    gameTime++;
    //dotsCount++;

    if (gameTime >= 90) {
      document.getElementById("subjectImg").setAttribute("src", "subject/CART212_7.png");
      gameIsStarted = false;
    }

    gameSpeed += 0.05;
    gameSpeed = Math.round(gameSpeed * 100) / 100;

    breakLevel = Math.round(breakLevel * 100) / 100;

    document.getElementById("time").innerHTML = "Time: " + gameTime + "s, Speed: " + gameSpeed + ", Breakage: " + breakLevel;
  }
}, 1000);

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

          breakLevel += 0.15;
        }
      }
    }

    console.log("Bio: " + bio_needs[0] + " " + bio_needs[1] + " " + bio_needs[2] + "\nEmo: " + emo_needs[0] + " " + emo_needs[1] + " " + emo_needs[2]);
  }
}, 1000);

var checkDecisions = setInterval(function() {
  if (gameIsStarted) {
    if ((lrg_index * 10) < (gameTime + 1)) {
      document.getElementById("lrg").innerHTML = lrg_decisons[lrg_index];
      lrg_index++;
    }

    switch (gameTime) {
      case 1: case 5: case 10: case 15:
        loadSmallDecisions(sml_decisons.youth, "sml");
        break;
      case 20: case 25: case 30: case 35:
        loadSmallDecisions(sml_decisons.adulthood, "sml");
        break;
      case 40: case 45: case 50: case 55:
        loadSmallDecisions(sml_decisons.old_age, "sml");
        break;
      case 60: case 65: case 70: case 75: case 80: case 85:
        loadSmallDecisions(sml_decisons.beyond, "sml");
        break;
    }
  }
}, 1000);

function loadSmallDecisions(array, id) {
  var temp = Math.floor(Math.random() * array.length);
  document.getElementById(id).innerHTML = array[temp];
  array.splice(temp, 1);
}

function decide(size, isYes) {
  if (gameIsStarted) {
    if (size == "lrg") {
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
    else if (size == "sml") {
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
  msg.rate = 1; // From 0.1 to 10
  msg.pitch = 0; // From 0 to 2
  msg.text = temp2;
  speechSynthesis.speak(msg);
}
