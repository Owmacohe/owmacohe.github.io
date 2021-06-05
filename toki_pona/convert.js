window.onload = function() {
  clearInput();
}

// Method to clear the input field
function clearInput() {
  document.getElementById('in').value = '';
}

// Method to check if the given word is valid
function change(event) {
  if (event.keyCode == 13 || event.target.id == 'convertButton') {
    var word = document.getElementById('in').value;

    var result = replaceLetters(word);

    if (result == null) {
      document.getElementById('out').innerHTML = 'unable to convert';
    }
    else {
      document.getElementById('out').innerHTML = word + ' = ' + result;
    }

    clearInput();
  }
}

function replaceLetters(givenWord) {
  try {
    if (givenWord == '') {
      throw new err;
    }

    var newWord = '';

    for (var i = 0; i < givenWord.length; i++) {
      switch (givenWord[i].toLowerCase()) {
        case 'b':
        case 'f':
          newWord += 'p';
          break;
        case 'c':
        case 'g':
        case 'q':
          newWord += 'k';
          break;
        case 'd':
          newWord += 't';
          break;
        case 'h':
          newWord += '';
          break;
        case 'r':
          newWord += 'l';
          break;
        case 'v':
          newWord += 'w';
          break;
        case 'x':
        case 'z':
          newWord += 's';
          break;
        case 'y':
          newWord += 'j';
          break;
        default:
          newWord += givenWord[i];
          break;
      }
    }

    return newWord;
  }
  catch {
    return null;
  }
}
