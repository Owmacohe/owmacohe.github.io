//clears and sets up the input field
window.onload = function() {
  var input = document.getElementById("input");
  input.value = "";
  input.setAttribute("onkeyup", "translate()");

  var target;
}

function translate() {
  var output = document.getElementById("output");

  //removes all prexisting words/letters
  while (output.lastChild) {
        output.removeChild(output.lastChild);
  }

  createWord(); //creates the default word

  input.value = input.value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

  for (var j = 0; j < input.value.length; j++) {
    var numb = input.value[j].toLowerCase().charCodeAt(0) - 96; //finds the ASCII code for the typed letter

    //if the letter is f, q, or s, replaces it with v, k, or z, respectively
    switch (numb) {
      case 6:
        numb = 22;
        break;
      case 17:
        numb = 11;
        break;
      case 19:
        numb = 26;
        break;
    }

    //if a space is typed, it creates a new word
    if (numb == -64) {
      createWord();
    }
    //otherwise, it creates a new letter
    else {
      var newCharacter = document.createElement("IMG");
      newCharacter.setAttribute("src", "\\Media/Spirit_Media/script_" + numb + ".svg");
      target.appendChild(newCharacter);
    }
  }
}

//creates a blank div for the next word
function createWord() {
  var newWord = document.createElement("DIV");
  newWord.setAttribute("class", "words");
  output.appendChild(newWord);
  target = newWord;
}
