window.onload = function() {
  var txt = document.getElementById('txt').innerHTML;

  var split = txt.split('\n');

  document.getElementById('txt').innerHTML = arrayToString(setColours(clearEmpties(split)));
}

function clearEmpties(split) {
  var temp = [];
  var count = 0;

  for (var i = 0; i < split.length; i++) {
    if (split[i][0] != ' ') {
      temp[count] = split[i];
      count++;
    }
    else if (split[i] != '') {
      temp[count] = '\n';
      count++;
    }
  }

  return temp;
}

function setColours(split) {
  var temp = [];

  for (var i = 0; i < split.length; i++) {
    var colour = '';

    if (i % 2 == 0) {
      colour = 'powderblue';
    }
    else {
      colour = 'darkseagreen';
    }

    temp[i] = '<span style="color: '+colour+';">' + split[i] + '</span>';
  }

  return temp;
}

function arrayToString(arr) {
  var temp = '';

  for (var i = 0; i < arr.length; i++) {
    temp += arr[i] + '\n';
  }

  return temp;
}
