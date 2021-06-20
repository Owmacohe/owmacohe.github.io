/*

Simple JavaSctipt AJAX script modified from this guide:
https://www.encodedna.com/javascript/how-to-read-data-from-external-json-file-in-javascript.htm

*/

var request = new XMLHttpRequest(); // XMLHttpRequest object
var wordsJSON; // JSON object to be read from once it is extracted from the file

// Initiating request
request.onreadystatechange = reportWordsStatus;
request.open('GET', 'toki_pona_words.json', true); // Getting the json file
request.send();

function reportWordsStatus() {
  // Checking if request is complete
  if (request.readyState == 4) {
    wordsJSON = JSON.parse(this.responseText);
  }
}

// Method to get the result of a searched word
function getWord(givenWord) {
  for (var i = 0; i < wordsJSON.words.length; i++) {
    // Staggered to indicate priority (in case of English / toki pona word overlap)
    if (givenWord.toLowerCase() == wordsJSON.words[i].toki_pona.toLowerCase()) {
      return [wordsJSON.words[i].toki_pona, wordsJSON.words[i].english_main, wordsJSON.words[i].english_alt];
    }
    else {
      var mainArray = wordsJSON.words[i].english_main.toLowerCase().split('/');

      for (var j = 0; j < mainArray.length; j++) {
        if (givenWord.toLowerCase() == mainArray[j]) {
          return [wordsJSON.words[i].toki_pona, wordsJSON.words[i].english_main, wordsJSON.words[i].english_alt];
        }
      }

      var altArray = wordsJSON.words[i].english_alt.toLowerCase().split('/');

      for (var k = 0; k < altArray.length; k++) {
        if (givenWord.toLowerCase() == altArray[k]) {
          return [wordsJSON.words[i].toki_pona, wordsJSON.words[i].english_main, wordsJSON.words[i].english_alt];
        }
      }
    }
  }
}
