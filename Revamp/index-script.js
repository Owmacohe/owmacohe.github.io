var slideCounter = setInterval(slideIn, 10);
var marginCurrent = 0;
var opacityCurrent = 0;
var max = 4;

function slideIn() {
  if (marginCurrent < max) {
    marginCurrent += 0.1;
    document.getElementById("notes").style.marginTop = marginCurrent + "vw";
    document.getElementById("portfolio").style.marginBottom = marginCurrent + "vw";
    document.getElementById("final").style.marginBottom = marginCurrent + "vw";
  }

  if ((opacityCurrent / max) < max)
  {
    opacityCurrent += 0.02;
    document.getElementById("notes").style.opacity = opacityCurrent;
    document.getElementById("portfolio").style.opacity = opacityCurrent;
    document.getElementById("final").style.opacity = opacityCurrent;
  }
}
