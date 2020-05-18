var botName = "BOT";
var userName = "YOU";

/* Fields */

var inputField;
var outputField;

//User communicates
function input(event) {
  event.preventDefault();

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

//Bot responds
function output(phrase) {
  outputField = document.getElementById("output");
  inputField = document.getElementById("input");

  var components = phrase.split(" ");
  responseFormulated = false;

  if (inputField.value.length < 201) {
    formulateResponse(components);
  }

  /*
  //Checks to see if I've made a preset response for a certain phrase
  var i;
  for (i = 0; i < presets.length; i++) {
    if (phrase == presets[i].input) {
      addLog(inputField.value, presets[i].output);
      responseFormulated = true;
    }
  }
  */

  //If the input is invalid, output error message
  if (responseFormulated == false) {
    outputField = document.getElementById("output");
    outputField.innerHTML = "Sorry, invalid input.";
  }

  //If the input is too long, output error message
  if (inputField.value.length > 200) {
    outputField = document.getElementById("output");
    outputField.innerHTML = "Sorry, try a shorter message.";
  }

  //console.log("OUTPUT: " + outputField.innerHTML);

  clearInput();
}

//Adds the input/output to the log
function addLog(userInput, botOutput) {
  outputField = document.getElementById("output");
  outputField.innerHTML = botOutput;

  if (outputField.innerHTML != "Sorry, invalid input." && outputField.innerHTML != "Sorry, try a shorter message.") {
    var logField = document.getElementById("log");

    var logPair = document.createElement("DIV");
    logPair.setAttribute("class", "pairSpacing");
    logField.appendChild(logPair);

    var userRow = document.createElement("DIV");
    userRow.setAttribute("class", "logStyle");
    logPair.appendChild(userRow);
    var botRow = document.createElement("DIV");
    botRow.setAttribute("class", "logStyle");
    logPair.appendChild(botRow);

    var userBold = document.createElement("B");
    userBold.setAttribute("style", "color: blue;");
    userBold.innerHTML = userName + ":";
    userRow.appendChild(userBold);
    var botBold = document.createElement("B");
    botBold.setAttribute("style", "color: red;");
    botBold.innerHTML = botName + ":";
    botRow.appendChild(botBold);

    var userPhrase = document.createElement("DIV");
    userPhrase.innerHTML = userInput;
    userRow.appendChild(userPhrase);
    var botPhrase = document.createElement("DIV");
    botPhrase.innerHTML = botOutput;
    botRow.appendChild(botPhrase);
  }
}

//Gives a random array element
function randWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//Formats any given string by setting it to lower case and removing punctiation
function formatString(string) {
  return string.toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-_`'~()]/g, "");
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
    if (array == verbs) {
      if (array[i].present == entry || array[i].past == entry) {
        result = true;
      }
    }
    else {
      if (array[i] == entry) {
        result = true;
      }
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
