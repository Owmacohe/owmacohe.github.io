function writeWait(targetID, speed, startWait) {
  if (speed == null) {
    speed = 40;
  }

  var text = document.getElementById(targetID).innerHTML;
  var letters = text.split("");
  text = "";
  document.getElementById(targetID).innerHTML = "";

  setTimeout(function() {
    for (var j = 0; j < letters.length; j++) {
      let k = j;
      setTimeout(function() {
        text = text + letters[k];
        //console.log(text);

        document.getElementById(targetID).innerHTML = text;
      }, speed * k);
    }
  }, startWait);
}
