var botName = "BOT";

/* Word collections */

var greetings = [
  "hello",
  "hey",
  "hi",
  "heyo",
  "yo"
];

/* Fields */

var inputField;
var outputField;
var logField;

//Input
function talk(event) {
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
      inputField.value = "";
    }

    /* End empty checking */

    //If the input isn't empty, output a response
    if (inputField.value != "") {
      console.log("INPUT: " + inputField.value);

      respond(inputField.value);
    }
  }
}

//Output
function respond(phrase) {
  outputField = document.getElementById("output");
  inputField = document.getElementById("input");

  var components = phrase.split(" ");
  var responseDelivered = false;

  if (inputField.value.length < 26) {
    //If the input is a greeting, output in kind
    var i;
    for (i = 0; i < greetings.length; i++) {
      if (formatString(components[0]) == greetings[i] || formatString(components[components.length - 1]) == greetings[i]) {
        addLog("YOU", inputField.value);
        addLog(botName, randWord(greetings));
        responseDelivered = true;
      }
    }
  }

  //If the input is invalid, output error message
  if (responseDelivered == false) {
    addLog(botName, "Sorry, invalid input.");
  }

  console.log("OUTPUT: " + outputField.innerHTML);

  inputField.value = "";
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

function formatString(string) {
  return string.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}
