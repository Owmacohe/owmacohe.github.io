var faces = document.getElementsByClassName("flexrainbow");
var faceColourNum = 0;
var backColourNum = 345;

var changeColour = setInterval(function change() {
  //Faces

  faceColourNum += 15;

  if (faceColourNum > 345) {
    faceColourNum = 0;
  }

  var i;
  for (i = 0; i < faces.length; i++) {
    faces[i].style.color = "hsl("+faceColourNum+", 100%, 50%)";
  }

  //Background

  backColourNum -= 15;

  if (backColourNum < 0) {
    backColourNum = 345;
  }

  var j;
  for (j = 0; j < faces.length; j++) {
    document.getElementById("background").style.backgroundColor = "hsl("+backColourNum+", 100%, 50%)";
  }

}, 50);

//Adding new faces
var addFace = setInterval(function add() {
  var newFace = document.createElement("DIV");
  document.getElementById("faces").appendChild(newFace);
  newFace.setAttribute("class", "flexrainbow");
  newFace.innerHTML = "ヽ༼ຈل͜ຈ༽ﾉ";

  document.getElementById("counter").innerHTML = "Dancers: " + (faces.length - 1);
}, 1000);
