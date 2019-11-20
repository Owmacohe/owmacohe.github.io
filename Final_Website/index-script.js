var slideFrame = 0;
var slideMax = 5;

var opInfoFrame = 0;
var opInfoMax  = 1;

var opEnterFrame = 0;
var opEnterMax = 1;

var waitFrame = 0;
var waitInfo = 5;
var waitEnter = 20;
var slideCounter = setInterval(slider, 10);

function slider() {
  if (waitFrame <= waitEnter)
  {
    waitFrame += 0.05;
  }

  if (waitFrame >= waitInfo) {
    if (opInfoFrame < opInfoMax)
    {
      opInfoFrame += opInfoMax / 100;
      document.querySelector(".flex_info").style.opacity = opInfoFrame;
    }
  }

  if (waitFrame >= waitEnter) {
    if (slideFrame < slideMax)
    {
      slideFrame += (slideMax - slideFrame) / 20;
      document.querySelector(".flex_enter").style.top = slideFrame + "vw";
    }

    if (opEnterFrame <= opEnterMax)
    {
      opEnterFrame += opEnterMax / 40;
      document.querySelector(".flex_enter").style.opacity = opEnterFrame;
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
