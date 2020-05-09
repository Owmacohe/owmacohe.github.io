var margins = [0, 0];
var speed = 1;

function startGame() {
  var player = document.createElement("IMG");
  document.getElementById("minigame").appendChild(player);
  player.setAttribute("src", "/Game_Media/Player.png");
  player.setAttribute("alt", "[PLAYER]");
  player.setAttribute("id", "player");

  document.getElementById("body").addEventListener("keydown", function(event) {
    //Up
    if (event.keyCode == 87 || event.keyCode == 38) {
      margins[0] = margins[0] - speed;
      player.style.marginTop = margins[0] + "vw";
    }
    //Down
    if (event.keyCode == 83 || event.keyCode == 40) {
      margins[0] = margins[0] + speed;
      player.style.marginTop = margins[0] + "vw";
    }
    //Right
    if (event.keyCode == 68 || event.keyCode == 39) {
      margins[1] = margins[1] + speed;
      player.style.marginLeft = margins[1] + "vw";
    }
    //Left
    if (event.keyCode == 65 || event.keyCode == 37) {
      margins[1] = margins[1] - speed;
      player.style.marginLeft = margins[1] + "vw";
    }

    console.log(margins);
  });
}
