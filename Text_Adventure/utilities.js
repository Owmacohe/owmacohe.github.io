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
    /* line 2 */ output += getRandomCharacter(3);
    /* line 3 */ output += getRandomCharacter(7);
    /* line 4 */ output += getRandomCharacter(12);
    /* line 5 */ output += getRandomCharacter(16);
    /* line 6 */ output += getRandomCharacter(23);
    /* line 7 */ output += getRandomCharacter(30);
  }
  else if (direction == "up") {
    /* line 1 */ output += getRandomCharacter(30);
    /* line 2 */ output += getRandomCharacter(23);
    /* line 3 */ output += getRandomCharacter(16);
    /* line 4 */ output += getRandomCharacter(12);
    /* line 5 */ output += getRandomCharacter(7);
    /* line 6 */ output += getRandomCharacter(3);
    /* line 7 */ output += getRandomCharacter(1);
  }

  return output;
}

function getRandomCharacter(iterations) {
  var randOutput = "";
  var characters = "aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz0123456789!@#$%^&*()-=_+`~[]{}:;,.?/";

  for (var i = 0; i < iterations; i++) {
    randOutput += characters[Math.floor(Math.random() * characters.length)];
  }

  return randOutput + "<br>";
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
