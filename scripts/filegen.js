//Valid file name (and by extension, file content) characters
var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&()-_=+[{]};',";

function generateFile() {
  //The name and content are each at least one character long
  var randName = characters[Math.floor(Math.random() * (characters.length))];
  var randText = characters[Math.floor(Math.random() * (characters.length))];

  //File name to 10,000 characters long
  for (var i = 0; i < 9999; i++) {
    if (Math.floor(Math.random() * 1) == 0) {
      randName += characters[Math.floor(Math.random() * (characters.length))];
    }
  }

  //File content to 1,000,000 characters long
  for (var j = 0; j < 999999; j++) {
    if (Math.floor(Math.random() * 1) == 0) {
      randText += characters[Math.floor(Math.random() * (characters.length))];
    }
  }

  download(randName, randText);
}

function download(filename, text) {
  //Create the hidden anchor
  var hiddenAnchor = document.createElement('a');
  hiddenAnchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  hiddenAnchor.setAttribute('download', filename + ".txt");
  hiddenAnchor.style.display = 'none';
  document.body.appendChild(hiddenAnchor);

  //Click it, then remove it
  hiddenAnchor.click();
  document.body.removeChild(hiddenAnchor);
}
