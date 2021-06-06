/*

Simple JavaSctipt AJAX script modified from this guide:
https://www.encodedna.com/javascript/how-to-read-data-from-external-json-file-in-javascript.htm

*/

var request = new XMLHttpRequest(); // XMLHttpRequest object
var textJSON; // JSON object to be read from once it is extracted from the file
var currentScenePath = "0";

window.onload = function() {
  // Initiating request
  request.onreadystatechange = reportStatus;
  request.open('GET', '\\scripts/text.json', true); // Getting the json file
  request.send();

  setTimeout(function() {
    loadScene(false, currentScenePath);
  }, 500 );
}

function reportStatus() {
  // Checking if request is complete
  if (request.readyState == 4) {
    textJSON = JSON.parse(this.responseText);
  }
}

function loadScene(isFromButton, givenScenePath) {
  if (isFromButton) {
    var temp = givenScenePath;
    givenScenePath = currentScenePath + "." + temp;
  }

  console.log(givenScenePath);

  for (var i = 0; i < textJSON.scenes.length; i++) {
    if (textJSON.scenes[i].path == givenScenePath) {
      document.getElementById('text').innerHTML = "";
      typeText(textJSON.scenes[i].main, 0);
      currentScenePath = givenScenePath;
    }
  }
}

function typeText(givenText, index) {
  if (index < givenText.length) {
    if (givenText[index] != " ") {
      setTimeout(function() {
        document.getElementById('text').innerHTML += givenText[index];
        index++;
        typeText(givenText, index);
      }, 50);
    }
    else {
      document.getElementById('text').innerHTML += givenText[index];
      index++;
      typeText(givenText, index);
    }
  }
}
