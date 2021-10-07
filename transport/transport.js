/*

LEVEL 1 (1s - 1m)
- food
- small household objects
- odds and ends

LEVEL 2 (1m - 10m)
- furniture
- electronics
- small raw materials

LEVEL 3 (10m - 60m)
- vehicles
- large raw materials
- industrial equipment

*/

var jobs = [
  // LEVEL 1
  ['A pizza', 2, 's'],
  ['Magazine', 2, 's'],
  ['2 pizzas', 4, 's'],
  ['Crate of toilet paper', 10, 's'],
  ['A prize show parakeet', 15, 's'],
  ['Mysterious glowing envolope', 20, 's'],
  ['The same parakeet (it escaped)', 30, 's'],
  ['A box of DVDs', 45, 's'],
  ['Case of forks and spoons', 1, 'm'],
  ['Large bag of forgotten mail', 1, 'm'],
  // LEVEL 2
  ['Small blocks of marble', 3, 'm'],
  ['Industrial deep fryer', 4, 'm'],
  ['Shipment of phones', 5, 'm'],
  ['A fridge', 5, 'm'],
  ['Confusing IKEA table', 6, 'm'],
  ['Mysterious glowing box', 7, 'm'],
  ['100 Funko Pops (all Kirby)', 7, 'm'],
  ['Live kangaroo', 8, 'm'],
  ['Big box of chairs', 10, 'm'],
  ['Rack of electric scooters', 10, 'm'],
  // LEVEL 3
  ['Cauldron of Play-Doh', 12, 'm'],
  ['A Vespa scooter', 12, 'm'],
  ['Person traped in carbonite', 14, 'm'],
  ['Crude oil barrels', 15, 'm'],
  ['Uranium-235 rods', 16, 'm'],
  ['Mysterious glowing pallet', 18, 'm'],
  ['A VW Beetle', 23, 'm'],
  ['A really heavy banana', 30, 'm'],
  ['Skyscraper crane', 45, 'm'],
  ['An entire house', 60, 'm']
];

var jobNum = 0;
var totalTime = 0;
var isDelivering = false;
var waitSeconds;
var isSeconds;

var bar;
var barWidth = 100;
var timeScale = 1;
var timeCount;
var timeType = '';

window.onload = function() {
  bar = document.getElementById('progressBar');
  setJob();
}

function setJob() {
  updateJobsCompleted();

  document.getElementById('delivery').innerHTML = jobs[jobNum][0];

  timeCount = jobs[jobNum][1];
  setTime();
}

function updateJobsCompleted() {
  var compl = document.getElementById('completed');
  compl.innerHTML = jobNum + ' job';

  if (jobNum != 1) {
    compl.innerHTML += 's';
  }

  var min = Math.floor(totalTime / 60);
  var sec = totalTime % 60;

  if (min != 0) {
    compl.innerHTML += ', ' + min + 'm';
  }

  if (sec != 0) {
    compl.innerHTML += ', ' + sec + 's';
  }
}

function setTime() {
  timeType = jobs[jobNum][2];

  if (jobs[jobNum][2] == 's') {
    isSeconds = true;
  }
  else if (jobs[jobNum][2] == 'm') {
    isSeconds = false;
  }

  document.getElementById('time').innerHTML = timeCount + timeType;
}

function startJob() {
  if (!isDelivering && jobNum < jobs.length) {
    isDelivering = true;
    bar.style.width = '90vw';

    if (isSeconds) {
      waitSeconds = jobs[jobNum][1];
    }
    else {
      waitSeconds = jobs[jobNum][1] * 60;
    }

    loopBar(1);
  }
}

function loopBar(iteration) {
  if (iteration < (waitSeconds + 1)) {
    var countdown = setTimeout(function() {
      if (isSeconds) {
        timeCount = jobs[jobNum][1] - iteration;
      }
      else if (!isSeconds && (iteration % 60 == 0)) {
        timeCount = jobs[jobNum][1] - (iteration / 60);
      }

      setTime();

      bar.style.width = (90 - (iteration * (barWidth / waitSeconds))) + 'vw';
      loopBar(iteration + 1);
    }, (1000 / timeScale));
  }
  else {
    isDelivering = false;
    bar.style.width = '0vw';

    var newLog = document.createElement('LI');
    document.getElementById('log').appendChild(newLog);
    newLog.innerHTML = jobs[jobNum][0] + ', ' + jobs[jobNum][1] + timeType;

    if (jobs[jobNum][2] == 's') {
      totalTime += jobs[jobNum][1];
    }
    else if (jobs[jobNum][2] == 'm') {
      totalTime += jobs[jobNum][1] * 60;
    }

    jobNum++;

    if (jobNum < jobs.length) {
      setJob();
    }
    else {
      updateJobsCompleted();
    }
  }
}
