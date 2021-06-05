/*

Simple JavaSctipt AJAX script modified from this guide:
https://www.encodedna.com/javascript/how-to-read-data-from-external-json-file-in-javascript.htm

*/

var request = new XMLHttpRequest(); // XMLHttpRequest object
var textJSON; // JSON object to be read from once it is extracted from the file

// Initiating request
request.onreadystatechange = reportStatus;
request.open('GET', 'toki_pona_words.json', true); // Getting the json file
request.send();

function reportStatus() {
  // Checking if request is complete
  if (request.readyState == 4) {
    textJSON = JSON.parse(this.responseText);
  }
}

function getWord(givenWord) {
  for (var i = 0; i < textJSON.words.length; i++) {
    if (givenWord == textJSON.words[i].toki_pona) {
      return [textJSON.words[i].english_main, textJSON.words[i].english_alt];
    }
  }
}
