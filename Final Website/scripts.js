var slideFrame = -90;
var slideMax = 0;

var opFrame = 0;
var opMax = 1;

var counter = setInterval(slider, 20);

function slider() {
  if (slideFrame <= slideMax)
  {
    slideFrame += 10;
    document.querySelector(".flexenter").style.top = slideFrame;
  }

  if (opFrame <= opMax)
  {
    opFrame += 0.02;
    document.querySelector(".flexenter").style.opacity = opFrame;
  }
}
