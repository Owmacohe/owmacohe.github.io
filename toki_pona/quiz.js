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

    for (var i = 0; i < textJSON.words.length; i++) {
      if (textJSON.words[i].toki_pona == quizWord) {
        var mainArray = textJSON.words[i].english_main.toLowerCase().split('/');

        for (var j = 0; j < mainArray.length; j++) {
          if (document.getElementById('in').value.toLowerCase()s == mainArray[j]) {
            document.getElementById('out1').innerHTML = 'correct';
            translate(i);

            isCorrect = true;

            correctWords[correctWords.length] = quizWord;

            document.getElementById('correct').innerHTML = ++correctNum;

            break;
          }
        }

        var altArray = textJSON.words[i].english_alt.toLowerCase().split('/');

        for (var k = 0; k < altArray.length; k++) {
          if (document.getElementById('in').value.toLowerCase()s == altArray[k]) {
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
      for (var l = 0; l < textJSON.words.length; l++) {
        if (textJSON.words[l].toki_pona.toLowerCase() == quizWord) {
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
  document.getElementById('out2').innerHTML = textJSON.words[index].toki_pona + ' = ' + textJSON.words[index].english_main;

  if (textJSON.words[index].english_alt != '') {
    document.getElementById('out2').innerHTML += '\nalso: ' + textJSON.words[index].english_alt;
  }
}

function loadWord() {
  var index = Math.floor(Math.random() * textJSON.words.length);
  var isMatched = true;

  while ((textJSON.words[index].section == 'grammar_connecters' || textJSON.words[index].section == 'grammar_replacers') || isMatched) {
    isMatched = false;

    index = Math.floor(Math.random() * textJSON.words.length);

    for (var i = 0; i < correctWords.length + 1; i++) {
      if (correctWords[i] == textJSON.words[index].toki_pona) {
        isMatched = true;
      }
    }
  }

  quizWord = textJSON.words[index].toki_pona;

  document.getElementById('question').innerHTML = quizWord;

  clearInput();
}
