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

// Method to check if the given word is valid
function check(event) {
  if (event.keyCode == 13 || (event.target != null && event.target.id == 'checkButton')) {
    var isCorrect = false;

    for (var i = 0; i < textJSON.words.length; i++) {
      if (textJSON.words[i].toki_pona == quizWord) {
        var mainArray = textJSON.words[i].english_main.toLowerCase().split('/');

        for (var j = 0; j < mainArray.length; j++) {
          if (document.getElementById('in').value == mainArray[j]) {
            document.getElementById('out1').innerHTML = 'correct';
            translate(i);

            isCorrect = true;

            break;
          }
        }

        var altArray = textJSON.words[i].english_alt.toLowerCase().split('/');

        for (var k = 0; k < altArray.length; k++) {
          if (document.getElementById('in').value == altArray[k]) {
            document.getElementById('out1').innerHTML = 'correct';
            translate(i);

            isCorrect = true;

            break;
          }
        }
      }
    }

    if (!isCorrect) {
      for (var l = 0; l < textJSON.words.length; l++) {
        if (textJSON.words[l].toki_pona == quizWord) {
            document.getElementById('out1').innerHTML = 'incorrect';
            translate(l);

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

  while (textJSON.words[index].section == 'grammar_connecters' || textJSON.words[index].section == 'grammar_replacers') {
    index = Math.floor(Math.random() * textJSON.words.length);
  }

  quizWord = textJSON.words[index].toki_pona;

  document.getElementById('question').innerHTML = quizWord;

  clearInput();
}
