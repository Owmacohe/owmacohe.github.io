var resolution = 1000;
var percentile = resolution / 4;

var signif = 0;
var zIndexes = [];
var leftCount = 0;
var imgGray = (Math.floor(Math.random() * 20) + 80);

window.onload = function() {
  loadImg();

  var circleCount = 40;
  var circleColour1 = 'hsl(' + Math.floor(Math.random() * 350) + ', ' + imgGray + '%, ' + imgGray + '%)';
  var circleColour2 = 'hsl(' + Math.floor(Math.random() * 350) + ', ' + imgGray + '%, ' + imgGray + '%)';
  loadCircle(circleCount * 0.6, circleCount / 4, circleColour1);
  loadCircle(circleCount * 0.3, circleCount / 8, circleColour2);

  document.getElementById('credit').style.color = circleColour1;
  document.getElementById('creditLink').style.color = circleColour2;
  document.getElementById('creditButton').style.background = circleColour2;
}

function loadImg() {
  var imgWidth = Math.floor(Math.random() * (resolution - percentile)) + percentile;

  var newImg = document.createElement('IMG');
  newImg.setAttribute('src', 'https://source.unsplash.com/random/' + imgWidth + 'x' + (2 * resolution) + '?sig=' + signif);
  signif++;

  newImg.style.left = leftCount + '%';

  var tempWidth = imgWidth / (resolution / 30);
  newImg.style.width = tempWidth + '%';
  leftCount += tempWidth;

  newImg.style.filter = 'grayscale(' + imgGray + '%)';

  var tempZIndex = Math.floor(Math.random() * (3 * signif));
  newImg.style.zIndex = tempZIndex;
  zIndexes[zIndexes.length] = tempZIndex;

  document.body.appendChild(newImg);

  if (leftCount < 100) {
    loadImg();
  }
}

function loadCircle(iterations, circleSize, circleColour) {
  for (var i = 0; i < iterations; i++) {
    var newCircle = document.createElement('DIV');

    newCircle.style.position = 'absolute';
    newCircle.style.left = Math.floor(Math.random() * 90) + '%';
    newCircle.style.top = Math.floor(Math.random() * 85) + '%';

    var halfSize = circleSize / 2;
    var tempWidth = Math.floor(Math.random() * halfSize) + halfSize;
    newCircle.style.width = tempWidth + 'vw';
    newCircle.style.height = tempWidth + 'vw';

    newCircle.style.borderRadius = (10 * circleSize) + '%';
    newCircle.style.background = circleColour;
    newCircle.style.zIndex = zIndexes[Math.floor(Math.random() * zIndexes.length)];

    document.body.appendChild(newCircle);
  }
}

function hide() {
  document.getElementById('creditBox').style.visibility = 'hidden';
}
