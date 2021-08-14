window.onload = function() {
  clearInput();

  setTimeout(function() {
    document.getElementById('wordCount').innerHTML = 'now with ' + wordsJSON.words.length + ' words!';
  }, 50);
}

// Method to clear the input field
function clearInput() {
  document.getElementById('in').value = '';
}

// Method to check if the given word is valid
function search(event) {
  if (event.keyCode == 13 || event.target.id == 'searchButton') {
    try {
      var word = document.getElementById('in').value;

      if (word == '') {
        throw new err;
      }
      else {
        load(word);

        clearInput();
      }
    }
    catch {
      document.getElementById('out1').innerHTML = 'no such word exists';
      document.getElementById('out2').innerHTML = 'did you spell it correctly?';

      clearInput();
    }
  }
}

// Method to load the word (or randomly pick one)
function load(word) {
  if (word == null) {
    word = wordsJSON.words[Math.floor(Math.random() * wordsJSON.words.length)].toki_pona;
  }

  var translations = getWord(word);

  document.getElementById('out1').innerHTML = translations[0] + ' = ' + translations[1];
  document.getElementById('out2').innerHTML = '';

  if (translations[2] != '') {
    document.getElementById('out2').innerHTML = 'also: ' + translations[2];
  }
}
