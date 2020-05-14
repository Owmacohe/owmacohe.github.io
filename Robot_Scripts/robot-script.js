var botName = "BOT";
var userName = "YOU";

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
      //console.log("INPUT: " + inputField.value);

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

  if (inputField.value.length < 201) {
    formulateResponse(components);
  }

  //If the input is invalid, output error message
  if (responseFormulated == false) {
    addLog(botName, "Sorry, invalid input.");
  }

  //If the input is too long, output error message
  if (inputField.value.length > 200) {
    addLog(botName, "Sorry, try a shorter message.");
  }

  //console.log("OUTPUT: " + outputField.innerHTML);

  clearInput();
}

//Adds the input/output to the log
function addLog(logName, phrase) {
  outputField = document.getElementById("output");
  outputField.innerHTML = phrase;

  if (phrase != "Sorry, invalid input." && phrase != "Sorry, try a shorter message.") {
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

//This is pretty obvious...
function clearInput() {
  inputField = document.getElementById("input");
  inputField.value = "";
}

//Checks if the given array contains a certain entry
function doesContain(array, entry) {
  var result = false;

  var i;
  for (i = 0; i < array.length; i++) {
    if (array[i] == entry) {
      result = true;
    }
  }

  if (result == true) {
    return true;
  }
  else {
    return false;
  }
}

//Capitalizes a given string
function capitalized(string) {
  var letters = string.split("");
  string = "";

  var i;
  for (i = 1; i < letters.length; i++) {
    if (string == "") {
      string = letters[0].toUpperCase();
    }

    string = string + letters[i];
  }

  return string;
}

//Turns a string into a question
function punctuated(string, punc) {
  return string + punc;
}

//Turns a string into a simple word
function unPunctuated(string) {
  if (string[string.length - 1] == "?" || string[string.length - 1] == "!") {
    var letters = string.split("");
    letters.splice(letters.length - 1, 1);
    string = "";

    var i;
    for (i = 0; i < letters.length; i++) {
      string = string + letters[i];
    }

    return string;
  }
}
