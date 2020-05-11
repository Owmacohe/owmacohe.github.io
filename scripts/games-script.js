var margins = [0, 0];
var speed = 3;

var player;
var present;
var instruct;
var game;

function startGame() {
  present = document.createElement("IMG");
  present.setAttribute("src", "/Media/Game_Media/Present.png");
  present.setAttribute("alt", "[PRESENT]");
  present.setAttribute("class", "gameElement");
  present.setAttribute("style", "right: 2vw");

  player = document.createElement("IMG");
  player.setAttribute("src", "/Media/Game_Media/Player.png");
  player.setAttribute("alt", "[PLAYER]");
  player.setAttribute("class", "gameElement");
  player.setAttribute("style", "left: 2vw");

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
  });

  instruct = document.getElementById("instructions");
  instruct.innerHTML = "Use the W, A, S, and D keys to move the player around. Go pick up that present!";
  instruct.style.fontSize = "2vw";

  game = document.getElementById("minigame");
  game.appendChild(player);
  game.appendChild(present);
  game.style.marginBottom = "30vh";
  game.style.marginTop = "5vh";
}

var hitCheck = setInterval(function() {
  if ((player != null) && (present != null) && (game != null)) {
    if (isCollide(player, present) == true) {
      instruct.innerHTML = "You did it! Congrats.";

      removeElement(game);
    }
  }
}, 50);

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

function removeElement(elem) {
  if (elem.parentNode != null) {
    elem.parentNode.removeChild(elem);
  }
}
