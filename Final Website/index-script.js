var slideFrame = -50;
var slideMax = 0;

var opFrame = 0;
var opMax = 1;

var frameWait = 0;
var waitMax = 2;
var slideCounter = setInterval(slider, 10);

function slider() {
  if (frameWait <= waitMax)
  {
    frameWait += 0.05;
  }
  else {
    if (slideFrame <= slideMax)
    {
      slideFrame += (slideMax - slideFrame) / 20;
      document.querySelector(".flex_enter").style.top = slideFrame;
    }

    if (opFrame <= opMax)
    {
      opFrame += opMax / 40;
      document.querySelector(".flex_enter").style.opacity = opFrame;
    }
  }
}

var periodNum = 0;
var enterCounter = setInterval(enterWait, 400);

function enterWait() {
  if (periodNum == 0)
  {
    periodNum++;
    document.getElementById("enterID").innerHTML = "Enter";
  }
  else if (periodNum == 1)
  {
    periodNum++;
    document.getElementById("enterID").innerHTML = "Enter.";
  }
  else if (periodNum == 2)
  {
    periodNum++;
    document.getElementById("enterID").innerHTML = "Enter..";
  }
  else if (periodNum == 3)
  {
    periodNum = 0;
    document.getElementById("enterID").innerHTML = "Enter...";
  }
}

function split() {
  console.log("Split window");
}
