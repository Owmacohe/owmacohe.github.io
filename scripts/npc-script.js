function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("scene").value = "";
  document.getElementById("number").value = "";
  document.getElementById("length").value = "";
}

function generate(isMultiple) {
  document.getElementById("npc_box").setAttribute("style", "border: 5px solid white;");

  if (isMultiple) {
    var generations = 1;

    if (document.getElementById("number").value != "") {
      generations = parseInt(document.getElementById("number").value);
    }

    for (var i = 0; i < generations; i++) {
      var wordLength = document.getElementById("length").value;

      createNPC(generateName(wordLength) + " " + generateName(wordLength), document.getElementById("scene").value);
    }
  }
  else {
    createNPC(document.getElementById("name").value, document.getElementById("scene").value);
  }
}

function generateName(wordLength) {
  wordLength = Math.floor(wordLength / 2);

  var consenants = "bcdfghjklmnpqrstvwxz";
  var vowels = "aeiouy";
  var temp = "";

  for (var j = 0; j < Math.floor(Math.random() * wordLength) + 1; j++) {
    temp += consenants[Math.floor(Math.random() * consenants.length)];
    temp += vowels[Math.floor(Math.random() * vowels.length)];
  }

  temp = temp.charAt(0).toUpperCase() + temp.slice(1);
  return temp;
}

function createNPC(name, scene) {
  var npc = document.createElement("DIV");
  document.getElementById("npc_box").appendChild(npc);
  npc.setAttribute("class", "npcs");

  npc.innerHTML = "Name: <em>" + name + "</em>\nDescription: <em>" + scene + "</em>";
}
