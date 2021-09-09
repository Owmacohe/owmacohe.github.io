var fields = [
  'path', // string value based on previous nodes chosen (e.g. 0232 is primary > tertiary > special > tertiary)
  'response', // response to previous node chosen
  'primary', // .0 (most basic choice)
  'secondary', // .1 (alternate choice)
  'tertiary', // .2 (comedic / wildcard choice)
  'special', // .3 (NPC or event based choice)
  'type' // .4 (choice unlocked by current player type)
];

var tree = [];

window.onload = function() {
  clear();
}

function clear() {
  for (var i in fields) {
    var temp = document.getElementById(fields[i]);
    temp.value = '';
  }
}

function add() {
  var target = document.getElementById('tree');
  var output = '{';

  for (var i in fields) {
    var temp = document.getElementById(fields[i]);

    output += '\n\t\"' + fields[i] + '\": \"' + temp.value + '\"';

    if (i < fields.length - 1) {
      output += ',';
    }
  }

  output += '\n}';

  tree[tree.length] = output;

  var newP = document.createElement('P');
  newP.innerHTML = output;
  document.getElementById('tree').appendChild(newP);

  clear();
}
