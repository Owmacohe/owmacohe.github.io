function writeWait(targetID, speed, startWait) {
  isWriting = true;

  if (speed == null) {
    speed = 40;
  }

  var text = document.getElementById(targetID).innerHTML;
  var letters = text.split("");
  text = "";
  document.getElementById(targetID).innerHTML = "";

  setTimeout(function() {
    for (var j = 0; j < letters.length; j++) {
      let k = j;
      setTimeout(function() {
        text = text + letters[k];
        //console.log(text);

        document.getElementById(targetID).innerHTML = text;
      }, speed * k);
    }
  }, startWait);

  setTimeout(function() {
    isWriting = false;
  }, 2750);
}

function removeElement(targetID) {
  if (document.getElementById(targetID) != null) {
    document.getElementById(targetID).remove();
  }
}

function randomFill(direction) {
  var output = "";

  if (direction == "down") {
    /* line 1 */ output += getRandomCharacter(1);
    output += "<br>";
    /* line 2 */ output += getRandomCharacter(3);
    output += "<br>";
    /* line 3 */ output += getRandomCharacter(7);
    output += "<br>";
    /* line 4 */ output += getRandomCharacter(12);
    output += "<br>";
    /* line 5 */ output += getRandomCharacter(16);
    output += "<br>";
    /* line 6 */ output += getRandomCharacter(23);
    output += "<br>";
    /* line 7 */ output += getRandomCharacter(30);
  }
  else if (direction == "up") {
    /* line 1 */ output += getRandomCharacter(30);
    output += "<br>";
    /* line 2 */ output += getRandomCharacter(23);
    output += "<br>";
    /* line 3 */ output += getRandomCharacter(16);
    output += "<br>";
    /* line 4 */ output += getRandomCharacter(12);
    output += "<br>";
    /* line 5 */ output += getRandomCharacter(7);
    output += "<br>";
    /* line 6 */ output += getRandomCharacter(3);
    output += "<br>";
    /* line 7 */ output += getRandomCharacter(1);
  }

  return output;
}

function getRandomCharacter(iterations, type) {
  var randOutput = "";
  var characters;

  if (type != null) {
    if (type == "alpha") {
      characters = "abcdefghijklmnopqrstuvwxyz";
    }
    else if (type == "alphaNum") {
      characters = "abcdefghijklmnopqrstuvwxyz01234567";
    }
  }
  else {
    characters = "aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz0123456789!@#$%^&*()-=_+`~[]{}:;,.?/";
  }

  //console.log(characters);

  for (var i = 0; i < iterations; i++) {
    randOutput += characters[Math.floor(Math.random() * characters.length)];
  }

  return randOutput;
}

//var currentScene = [];

/*
function getScene() {
  for (var i = 0; i < 9; i++) {
    currentScene[i] = document.getElementById("s" + (i+1)).innerHTML;
  }
}
*/

/*
function clearScene() {
  for (var i = 0; i < 9; i++) {
    document.getElementById("s" + (i+1)).innerHTML = "";
  }
}
*/
