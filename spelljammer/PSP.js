window.onload = function() {
  clear();
}

function clear() {
  document.getElementById('in').value = '';
}

function translate() {
  var text = document.getElementById('in').value.toLowerCase();

  clear();

  var copy = document.createElement('P');
  copy.innerHTML = text;
  document.body.appendChild(copy);

  var out = document.createElement('DIV');
  out.setAttribute('class', 'out');
  document.body.appendChild(out);

  for (var i = 0; i < text.length; i++) {
    if (isValid(text[i])) {
      var path;

      if (i < text.length - 1 && isHModifier(text[i]) && text[i+1] == 'h') {
        var offset = 0;

        switch (text[i]) {
          case 'c':
            offset = 26;
            break;
          case 'g':
            offset = 27;
            break;
          case 'p':
            offset = 28;
            break;
          case 'r':
            offset = 29;
            break;
          case 's':
            offset = 30;
            break;
          case 't':
            offset = 31;
            break;
          case 'w':
            offset = 32;
            break;
        }

        path = 'PSP/pairs/psp_pairs_' + offset + '.png';

        i++;
      }
      else if (i < text.length - 1 && isVowel(text[i]) && isVowel(text[i+1])) {
        var offset = 0;

        switch (text[i]) {
          case 'e':
            offset += 4;
            break;
          case 'i':
            offset += 8;
            break;
          case 'o':
            offset += 16;
            break;
          case 'u':
            offset += 20;
            break;
        }

        switch (text[i+1]) {
          case 'a':
            offset += 1;
            break;
          case 'e':
            offset += 2;
            break;
          case 'i':
            offset += 3;
            break;
          case 'o':
            offset += 4;
            break;
          case 'u':
            offset += 5;
            break;
        }

        path = 'PSP/pairs/psp_pairs_' + offset + '.png';

        i++;
      }
      else {
        switch (text[i]) {
          case 'q':
            path = 'PSP/alphabet/psp_alphabet_11.png';
            break;
          case 'z':
            path = 'PSP/alphabet/psp_alphabet_19.png';
            break;
          case ' ':
            path = 'PSP/space.png';
            break;
          case '.':
            path = 'PSP/period.png';
            break;
          case '?':
            path = 'PSP/question.png';
            break;
          default:
            var ascii = text.charCodeAt(i) - 96;
            path = 'PSP/alphabet/psp_alphabet_' + ascii + '.png';
            break;
        }
      }

      var newLetter = document.createElement('IMG');
      newLetter.setAttribute('src', path);
      out.appendChild(newLetter);
    }
  }
}

function isValid(character) {
  if (
    character == 'a' ||
    character == 'b' ||
    character == 'c' ||
    character == 'd' ||
    character == 'e' ||
    character == 'f' ||
    character == 'g' ||
    character == 'h' ||
    character == 'i' ||
    character == 'j' ||
    character == 'k' ||
    character == 'l' ||
    character == 'm' ||
    character == 'n' ||
    character == 'o' ||
    character == 'p' ||
    character == 'r' ||
    character == 's' ||
    character == 't' ||
    character == 'u' ||
    character == 'v' ||
    character == 'w' ||
    character == 'x' ||
    character == 'y' ||
    character == ' ' ||
    character == '.' ||
    character == '?') {
    return true;
  }
  else {
    return false;
  }
}

function isHModifier(character) {
  if (
    character == 'c' ||
    character == 'g' ||
    character == 'p' ||
    character == 'r' ||
    character == 's' ||
    character == 't' ||
    character == 'w') {
    return true;
  }
  else {
    return false;
  }
}

function isVowel(character) {
  if (
    character == 'a' ||
    character == 'e' ||
    character == 'i' ||
    character == 'o' ||
    character == 'u') {
    return true;
  }
  else {
    return false;
  }
}
