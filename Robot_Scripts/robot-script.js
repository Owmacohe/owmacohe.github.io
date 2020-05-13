var botName = "BOT";
var responseFormulated;

/* Fields */

var inputField;
var outputField;
var logField;

//User communicates
function input(event) {
  if (event.keyCode == 13) {
    inputField = document.getElementById("input");

    /* Start empty checking */

    var splitInput = inputField.value.split("");
    var badCount = 0;

    var i;
    for (i = 0; i < inputField.value.length; i++) {
      if (splitInput[i] == " ") {
        badCount++;
      }
    }

    if (badCount == inputField.value.length) {
      clearInput();
    }

    /* End empty checking */

    //If the input isn't empty, output a response
    if (inputField.value != "") {
      oldTime = timeGet;
      console.log("INPUT: " + inputField.value);

      output(formatString(inputField.value));
    }
  }
}

//Bot responds
function output(phrase) {
  outputField = document.getElementById("output");
  inputField = document.getElementById("input");

  var components = phrase.split(" ");
  responseFormulated = false;

  if (inputField.value.length < 101) {
    formulateResponse(components);
  }

  //If the input is invalid, output error message
  if (responseFormulated == false) {
    addLog(botName, "Sorry, invalid input.");
  }

  console.log("OUTPUT: " + outputField.innerHTML);

  clearInput();
}

//Adds the input/output to the log
function addLog(logName, phrase) {
  outputField = document.getElementById("output");
  outputField.innerHTML = phrase;

  if (phrase != "Sorry, invalid input.") {
    logField = document.getElementById("log");

    //If the log is empty, don't add new lines
    if (logField.innerHTML == "") {
      logField.innerHTML = logField.innerHTML + logName + ": " + phrase;
    }
    //If it isn't, do add new lines
    else {
      logField.innerHTML = logField.innerHTML + "<br><br>" + logName + ": " + phrase;
    }
  }
}

//Gives a random array element
function randWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//Formats any given string by setting it to lower case and removing punctiation
function formatString(string) {
  return string.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

function clearInput() {
  inputField = document.getElementById("input");
  inputField.value = "";
}
