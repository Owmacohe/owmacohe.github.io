window.onload = function() {
  setTimeout(function() {
    loadWord();
  }, 200);
}

// Method to clear the input field
function clearInput() {
  document.getElementById('in').value = '';
}

var quizWord;
var correctNum = 0;
var incorrectNum = 0;
var correctWords = [];

// Method to check if the given word is valid
function check(event) {
  if (event.keyCode == 13 || (event.target != null && event.target.id == 'checkButton')) {
    var isCorrect = false;

    for (var i = 0; i < wordsJSON.words.length; i++) {
      if (wordsJSON.words[i].toki_pona == quizWord) {
        var mainArray = wordsJSON.words[i].english_main.toLowerCase().split('/');

        for (var j = 0; j < mainArray.length; j++) {
          if (document.getElementById('in').value.toLowerCase() == mainArray[j]) {
            document.getElementById('out1').innerHTML = 'correct';
            translate(i);

            isCorrect = true;

            correctWords[correctWords.length] = quizWord;

            document.getElementById('correct').innerHTML = ++correctNum;

            break;
          }
        }

        var altArray = wordsJSON.words[i].english_alt.toLowerCase().split('/');

        for (var k = 0; k < altArray.length; k++) {
          if (document.getElementById('in').value.toLowerCase() == altArray[k]) {
            document.getElementById('out1').innerHTML = 'correct';
            translate(i);

            isCorrect = true;

            correctWords[correctWords.length] = quizWord;

            document.getElementById('correct').innerHTML = ++correctNum;

            break;
          }
        }
      }
    }

    if (!isCorrect) {
      for (var l = 0; l < wordsJSON.words.length; l++) {
        if (wordsJSON.words[l].toki_pona.toLowerCase() == quizWord) {
            document.getElementById('out1').innerHTML = 'incorrect';
            translate(l);

            document.getElementById('incorrect').innerHTML = ++incorrectNum;

            break;
        }
      }
    }

    loadWord();
  }
}

function translate(index) {
  document.getElementById('out2').innerHTML = wordsJSON.words[index].toki_pona + ' = ' + wordsJSON.words[index].english_main;

  if (wordsJSON.words[index].english_alt != '') {
    document.getElementById('out2').innerHTML += '\nalso: ' + wordsJSON.words[index].english_alt;
  }
}

function loadWord() {
  var index = Math.floor(Math.random() * wordsJSON.words.length);
  var isMatched = true;

  while ((wordsJSON.words[index].section == 'grammar_connecters' || wordsJSON.words[index].section == 'grammar_replacers') || isMatched) {
    isMatched = false;

    index = Math.floor(Math.random() * wordsJSON.words.length);

    for (var i = 0; i < correctWords.length + 1; i++) {
      if (correctWords[i] == wordsJSON.words[index].toki_pona) {
        isMatched = true;
      }
    }
  }

  quizWord = wordsJSON.words[index].toki_pona;

  document.getElementById('question').innerHTML = quizWord;

  clearInput();
}
