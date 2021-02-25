var input = document.getElementById("input");
input.value = "";

function translate() {
  var output = document.getElementById("output");

  while (output.lastChild) {
        output.removeChild(output.lastChild);
  }

  for (var j = 0; j < input.value.length; j++) {
    var numb = input.value[j].charCodeAt(0) - 96;;

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

    var newCharacter = document.createElement("IMG");
    newCharacter.setAttribute("src", "\\Media/Spirit_Media/script_" + numb + ".svg");
    output.appendChild(newCharacter);
  }
}
