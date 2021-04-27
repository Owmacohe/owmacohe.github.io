window.onload = function() {
  //newWave();
}

var signif = 0;

function newWave() {
  var newImg = document.createElement('img');

  var resolution = 1000;
  var tempX = Math.floor(Math.random() * (resolution - (resolution / 4))) + (resolution / 4);

  newImg.setAttribute('src', 'https://source.unsplash.com/random/' + tempX + 'x' + (2 * resolution) + '?sig=' + signif);
  signif++;

  newImg.style.width = (tempX / (resolution / 35)) + '%';
  newImg.style.marginLeft = (Math.floor(Math.random() * 1500) + 1500) + 'px';

  var imgGray = (Math.floor(Math.random() * 30) + 70);
  newImg.style.filter = 'grayscale(' + imgGray + '%)';

  document.body.appendChild(newImg);
}

var waveTime = 0;
var waveSpeed;
var waveCount = 0;

var waves = setInterval(function() {
  waveTime += 0.003;

  if (waveTime >= 2) {
    waveTime = 0;
  }

  var images = document.getElementsByTagName('img');

  for (var i in images) {
    var wavePace = (Math.random() * 5) / 2;
    waveSpeed = 100 * (wavePace * Math.cos(waveTime * Math.PI)) / 100 + wavePace;

    try {
      var temp = images[i].style.marginLeft.substring(0, images[i].style.marginLeft.length - 2);
      temp -= waveSpeed;
      images[i].style.marginLeft = temp + 'px';
    }
    catch (err) {
      break;
    }

    var remaining = images[i].getBoundingClientRect().left;

    if (waveCount < 30) {
      newWave();
      waveCount++;
    }
    else if (remaining <= -500) {
      images[i].remove();
      waveCount--;
    }
  }
}, 1);
