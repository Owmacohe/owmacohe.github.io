var currentScene = [];
var screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9;

function load(screens) {
  getScene();

  if (screens == null) {
    currentScene = scene01;
  }

  applyScene();
}

function applyScene() {

}

function getScene() {
  for (var i = 0; i < 10; i++) {
    currentScene[i] = document.getElementById("s" + i).innerHTML;
  }

  console.log(currentScene);
}

function clearScene() {

}
