var pos = [50, 50];
var size = 2;
var speed = 4;
var border = 1.5 * speed;
var isFlashToggled = false;
var hiddenNum = 0;
var reset;

var collideCheck = setInterval( function() {
  if (isCollide(document.getElementById("player"), document.getElementById("meaning")) && hiddenNum == 0) {
    document.getElementById("meaning").style.color = "blue";
    document.getElementById("info").innerHTML = "WASD / do as told / this is deserved";
    hiddenNum++;
    document.getElementsByClassName("hidden")[hiddenNum].style.color = "floralwhite";
  }
  else if (isCollide(document.getElementById("player"), document.getElementById("rejoice")) && hiddenNum == 1) {
    document.getElementById("rejoice").style.color = "blue";
    document.getElementById("info").innerHTML = "WASD / should i keep looking? / that's a good question";
    hiddenNum++;
    document.getElementsByClassName("hidden")[hiddenNum].style.color = "floralwhite";
  }
  else if (isCollide(document.getElementById("player"), document.getElementById("something")) && hiddenNum == 2) {
    document.getElementById("something").style.color = "blue";
    document.getElementById("info").innerHTML = "WASD / maybe keep abaiting entropy / meaningless celebration";
    hiddenNum++;
    document.getElementsByClassName("hidden")[hiddenNum].style.color = "floralwhite";
  }
}, 50);

window.onload = function() {
  loadSize(size);

  var hidds = document.getElementsByClassName("hidden");
  hidds[hiddenNum].style.color = "floralwhite";

  for (var i = 0; i < hidds.length; i++) {
    hidds[i].style.left = (Math.floor(Math.random() * 80) + 10) + "%";
    hidds[i].style.top = (Math.floor(Math.random() * 80) + 10) + "%";
  }
}

window.onkeydown = function(event){
  var pl = document.getElementById("player");

  if (event.keyCode == 38 || event.keyCode == 87) { //up
    if (pos[0] > border) {
      pos[0] -= speed;
    }
  }
  else if (event.keyCode == 40 || event.keyCode == 83) { //down
    if (pos[0] < (100 - border)) {
      pos[0] += speed;
    }
  }
  else if (event.keyCode == 39 || event.keyCode == 68) { //right
    if (pos[1] < (104 - border)) {
      pos[1] += speed;
    }
  }
  else if (event.keyCode == 37 || event.keyCode == 65) { //left
    if (pos[1] > (border - 4)) {
      pos[1] -= speed;
    }
  }
  else {
    toggleFlash();

    reset = setInterval(function() {
      toggleFlash();
    }, 1500);
  }


  pl.style.top = pos[0] + "%";
  pl.style.left = pos[1] + "%";
};

function toggleFlash() {
  var nam = document.getElementById("playerName");
  var rec = document.getElementById("playerRect");
  var inf = document.getElementById("info");
  var hidds = document.getElementsByClassName("hidden");

  if (isFlashToggled) {
    nam.innerHTML = "you";
    nam.style.color = "black";
    rec.style.fill = "black";
    document.body.style.backgroundColor = "white";
    inf.style.color = "black";
    inf.innerHTML = "WASD / find meaning / bad buttons are bad";

    for (var i = 0; i < hidds.length; i++) {
      if (hidds[i].style.color == "red") {
        hidds[i].style.color = "blue";
      }
      else {
        hidds[i].style.color = "white";
      }
    }

    hidds[hiddenNum].style.color = "floralwhite";

    clearInterval(reset);
    isFlashToggled = false;
  }
  else {
    nam.innerHTML = "NO. BAD BUTTON.";
    nam.style.color = "red";
    rec.style.fill = "red";
    document.body.style.backgroundColor = "black";
    inf.style.color = "red";
    inf.innerHTML = "A DISSAPOINTMENT, TO BE SURE";
    pos[0] = 50;
    pos[1] = 50;

    for (var i = 0; i < hidds.length; i++) {
      if (hidds[i].style.color == "blue") {
        hidds[i].style.color = "red";
      }
      else if (hidds[i].style.color == "white" || hidds[i].style.color == "floralwhite") {
        hidds[i].style.color = "black";
      }
    }

    isFlashToggled = true;
  }
}

function loadSize(size) {
  var rec = document.getElementById("playerRect");
  var pix = document.getElementById("playerSVG");

  rec.style.width = size + "vw";
  rec.style.height = rec.style.width;
  pix.style.width = size + "vw";
  pix.style.height = pix.style.width;
}

function isCollide(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}
