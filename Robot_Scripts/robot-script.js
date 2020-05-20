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

  audioResponse = new SpeechSynthesisUtterance;
  audioResponse.text = outputField.innerHTML;
  audioResponse.voice = speechSynthesis.getVoices()[0];
  audioResponse.volume = 0.5;
  speechSynthesis.speak(audioResponse);

  clearInput();
}

//Adds the input/output to the log
function addLog(userInput, botOutput) {
  //Checks to see if the output is punctuated
  if (botOutput[botOutput.length - 1] != ("." || "!" || "?")) {
    botOutput = punctuated(botOutput, ".");
  }

  //Checks to see if the output is capitalized
  if (botOutput[0] != botOutput[0].toUpperCase()) {
    var letters = botOutput.split("");
    botOutput = "";

    for (i in letters) {
      if (botOutput == "") {
        botOutput = letters[i].toUpperCase();
      }
      else {
        botOutput = botOutput + letters[i];
      }
    }
  }

  outputField = document.getElementById("output");
  outputField.innerHTML = botOutput;

  if (botOutput != ("Sorry, invalid input." || "Sorry, try a shorter message.")) {
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
    userBold.setAttribute("style", "color: blue; margin-right: 1vw;");
    userBold.innerHTML = userName + ":";
    userRow.appendChild(userBold);
    var botBold = document.createElement("B");
    botBold.setAttribute("style", "color: red; margin-right: 1vw;");
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

//Adds any punctuation to the end of a string
function punctuated(string, punc) {
  return string + punc;
}

//Pluralizes a string
function pluralized(string) {
  if (string[string.length - 1] != "y") {
    string = string + "s";
  }
  else if (string[string.length - 1] == "y") {
    stringArray = string.split("");
    string = "";

    stringArray.splice(stringArray.length - 1, 1);

    var i;
    for (i = 0; i < stringArray.length; i++) {
      string = string + stringArray[i];
    }

    string = string + "ies";
  }

  return string;
}

//Makes a word not pluralized anymore
function unPluralized(string) {
  if (string[string.length - 1] == "s") {
    stringArray = string.split("");
    string = "";
    stringArray.splice(stringArray.length - 1, 1);

    if (stringArray[stringArray.length - 1] == "e" && stringArray[stringArray.length - 2] == "i") {
      stringArray.splice(stringArray.length - 1, 1);
      stringArray[stringArray.length - 1] = "y";
    }

    var i;
    for (i = 0; i < stringArray.length; i++) {
      string = string + stringArray[i];
    }
  }
  else if (string[string.length - 1] == "e") {
    stringArray = string.split("");
    string = "";
    stringArray.splice(stringArray.length - 1, 1);
    stringArray.splice(stringArray.length - 1, 1);

    var i;
    for (i = 0; i < stringArray.length; i++) {
      string = string + stringArray[i];
    }
  }

  return string;
}
