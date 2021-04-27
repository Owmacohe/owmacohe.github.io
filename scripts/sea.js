window.onload = function() {
  newWave(Math.floor(Math.random() * 4) + 3);
}

var signif = 0;

function newWave(count) {
  var imgCount = count;
  var imgRatio = 100 / imgCount;
  var imgGray = (Math.floor(Math.random() * 30) + 70);

  for (var i = 0; i < imgCount; i++) {
    var newImg = document.createElement('img');

    var tempX = Math.floor(window.innerWidth / 3.75);
    var tempY = (230 * imgCount) + 10;

    newImg.setAttribute('src', 'https://source.unsplash.com/random/' + tempX + 'x' + tempY + '?sig=' + signif);
    signif++;

    newImg.style.left = (imgRatio * i) + '%';
    newImg.style.width = imgRatio + '%';
    newImg.style.marginLeft = (Math.floor(Math.random() * 600) + 1400) + 'px';

    newImg.style.filter = 'grayscale(' + imgGray + '%)';

    document.body.appendChild(newImg);
  }
}

var waveTime = 0;
var waveSpeed;
var isRushing = false;

var waveCount = 0;

var waves = setInterval(function() {
  waveTime += 0.003;

  if (waveTime >= 2) {
    waveTime = 0;
  }

  var images = document.getElementsByTagName('img');

  for (var i in images) {
    var wavePace = Math.random() * 5;
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
      var temp = (Math.floor(Math.random() * 4) + 3);
      newWave(temp);
      waveCount += temp;
    }
    else if (remaining <= -500) {
      images[i].remove();
      waveCount--;
    }
  }
}, 1);
