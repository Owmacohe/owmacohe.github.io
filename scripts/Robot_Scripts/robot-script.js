var userQualities = {
  "who": ["YOU"],
  "what": [null],
  "where": [null],
  "why": [null],
  "when": [null],
  "how": [null]
};

var botQualities = {
  "who": ["BOT"],
  "what": ["a JavaScript algorithm (aka a bot)"],
  "where": ["on this website"],
  "why": ["a conversational test bot"],
  "when": ["May 12th 2020 AD"],
  "how": ["well"]
};

var inputField;
var outputField;

var audioEnabled = false;

//User communicates
function input(event) {
  event.preventDefault();

  inputField = document.getElementById("input");

  /* ~~~ Start empty checking ~~~ */

  var splitInput = inputField.value.split("");
  var badCount = 0;

  for (var i in inputField.value) {
    if (splitInput[i] == " ") {
      badCount++;
    }
  }

  if (badCount == inputField.value.length) {
    clearInput();
  }

  /*  ~~~ End empty checking ~~~ */

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
  formulated = false;

  if (inputField.value.length < 201) {
    formulateResponse(components);
  }

  //If the input is invalid, output error message
  if (formulated == false) {
    outputField = document.getElementById("output");
    outputField.innerHTML = "Sorry, invalid input.";
  }

  //If the input is too long, output error message
  if (inputField.value.length > 200) {
    outputField = document.getElementById("output");
    outputField.innerHTML = "Sorry, try a shorter message.";
  }

  if (audioEnabled == true) {
    audioResponse = new SpeechSynthesisUtterance;
    audioResponse.text = outputField.innerHTML;
    audioResponse.voice = speechSynthesis.getVoices()[0];
    audioResponse.volume = 0.5;
    speechSynthesis.speak(audioResponse);
  }

  clearInput();
}

//Adds the input/output to the log
function addLog(userInput, botOutput) {
  //Checks to see if the output is punctuated, and if it isn't it punctuates it
  if (botOutput[botOutput.length - 1] != "." && botOutput[botOutput.length - 1] != "!" && botOutput[botOutput.length - 1] != "?") {
    botOutput = punctuated(botOutput, ".");
  }

  //Checks to see if the output is capitalized, and if it isn't it capitalizes it
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
    userBold.innerHTML = userQualities.who + ":";
    userRow.appendChild(userBold);
    var botBold = document.createElement("B");
    botBold.setAttribute("style", "color: red; margin-right: 1vw;");
    botBold.innerHTML = botQualities.who + ":";
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

//This is pretty obvious...
function clearInput() {
  inputField = document.getElementById("input");
  inputField.value = "";
}

//Checks if the given array contains a certain entry
function doesContain(array, entry) {
  var result;

  for (var i in array) {
    if (typeof array[i] == "string" && formatString(array[i]) == entry) {
      result = true;
      break;
    }
  }

  if (result == true) {
    return true;
  }
  else {
    return false;
  }
}

//Enables or disables the text to speech of the bot
function audioToggle() {
  if (audioEnabled == false) {
    audioEnabled = true;
  }
  else {
    audioEnabled = false;
  }
}
