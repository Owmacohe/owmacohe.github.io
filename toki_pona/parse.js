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

// Method to get the result of a searched word
function getWord(givenWord) {
  for (var i = 0; i < textJSON.words.length; i++) {
    // Staggered to indicate priority (in case of English / toki pona word overlap)
    if (givenWord.toLowerCase() == textJSON.words[i].toki_pona.toLowerCase()) {
      return [textJSON.words[i].toki_pona, textJSON.words[i].english_main, textJSON.words[i].english_alt];
    }
    else {
      var mainArray = textJSON.words[i].english_main.toLowerCase().split('/');

      for (var j = 0; j < mainArray.length; j++) {
        if (givenWord.toLowerCase() == mainArray[j]) {
          return [textJSON.words[i].toki_pona, textJSON.words[i].english_main, textJSON.words[i].english_alt];
        }
      }

      var altArray = textJSON.words[i].english_alt.toLowerCase().split('/');

      for (var k = 0; k < altArray.length; k++) {
        if (givenWord.toLowerCase() == altArray[k]) {
          return [textJSON.words[i].toki_pona, textJSON.words[i].english_main, textJSON.words[i].english_alt];
        }
      }
    }
  }
}
