window.onload = function() {
  var sizeFac = (Math.random() * 0.19) + 0.01; // sizeFac ∈ [0.01, 0.2]
  var size = Math.floor(sizeFac * window.innerWidth);
  var count = Math.floor(Math.pow(2, -0.05 * (size - 270))) + 30; // https://www.desmos.com/calculator/eack6x52xf

  for (var i = 0; i < count; i++) {
    var newPix = document.createElement("DIV");
    newPix.setAttribute("class", "pixel");
    newPix.style.width = size + "px";
    newPix.style.height = newPix.style.width;
    newPix.style.borderRadius = (size / 300) + "vw";

    newPix.style.background = "linear-gradient(145deg, " + getRandomColour("hex") + ", " + getRandomColour("hex") + ")";

    var temp = "abcdefghijklmnopqrstuvwxyz0123456789"
    newPix.innerHTML = temp[Math.floor(Math.random() * temp.length)];
    newPix.style.fontSize = (size / 20) + "vw";
    newPix.style.color = getRandomColour("hex");

    document.getElementById("flexrow").appendChild(newPix);
  }
}

function getRandomColour(type, isGradient) {
  if (type == "hex") {
    var characters = "0123456ABCDEF";
    var temp = "#";

    for (var i = 0; i < 6; i++) {
      temp += characters[Math.floor(Math.random() * characters.length)];
    }

    return temp;
  }
  else if (type == "rgb") {
    if (isGradient) {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      var temp1 = "rgb(" + r + ", " + g + ", " + b + ")";
      var temp2 = "rgb(" + (r+70) + ", " + (g+100) + ", " + b + ")";
      return "linear-gradient(45deg, " + temp1 + ", " + temp2 + ")";
    }
    else {
      return "rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ")";
    }
  }
}
