window.onload = function() {
  var imgCount = Math.floor(Math.random() * 3) + 3;
  var imgRatio = 100 / imgCount;
  var imgGray = (Math.floor(Math.random() * 15) + 85);

  for (var i = 0; i < imgCount; i++) {
    var newImg = document.createElement('IMG');

    var temp = (230 * imgCount) + 10;
    newImg.setAttribute('src', 'https://source.unsplash.com/random/400x' + temp + "?sig=" + i);

    newImg.style.left = (imgRatio * i) + "%";
    newImg.style.width = imgRatio + "%";

    newImg.style.filter = "grayscale(" + imgGray + "%)";
    newImg.style.zIndex = Math.floor(Math.random() * imgCount);

    document.body.appendChild(newImg);
  }
}
