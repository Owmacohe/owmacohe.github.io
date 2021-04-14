window.onload = function() {
  document.getElementById("input").value = "";
}

var wordScores = [];

var sentenceLength = 0;
var words = [];

function wordParse() {
  var text = document.getElementById("input").value;
  var sentences = text.split(". ");

  for (var i in sentences) {
    words[i] = sentences[i].split(" ");
    sentenceLength = (sentenceLength + sentences[i].length) / 2;
  }

  for (var j in words) {
    for (var k in words[j]) {
      words[j][k] = words[j][k].toUpperCase();

      if (k == 0) {
        addWordScore(words[j][k], true, false, words[j][1]);
      }
      else if (k == words[j].length - 1) {
        addWordScore(words[j][k], false, true, words[j][words[j].length - 2]);
      }
      else {
        addWordScore(words[j][k], false, false, words[j][k - 1]);
      }
    }
  }

  createSentences(1);

  console.log(wordScores);
}

function addWordScore(givenWord, isStart, isEnd, pre) {
  var isRepeat = false;

  for (var i in wordScores) {
    if (wordScores[i].word == givenWord) {
      isRepeat = true;
      wordScores[i].frequency++;
      wordScores[i].precursor.push(pre);

      if (isStart) {
        wordScores[i].startScore++;
      }
      else if (isEnd) {
        wordScores[i].endScore++;
      }
    }
  }

  if (!isRepeat) {
    var st = 0;
    var nd = 0;

    if (isStart) {
      st = 1;
    }
    else if (isEnd) {
      nd = 1;
    }

    wordScores.push({ "word": givenWord, "frequency": 1, "startScore": st, "endScore": nd, "precursor": [pre] });
  }
}

function createSentences(sentenceNum) {
  var start = "";
  var startHighest = 0;
  var end = "";
  var endHighest = 0;

  var freqFirst = 0;
  var freqSecond = 0;
  var freqThird = 0;

  for (var i in words) {
    for (var j in words[i]) {
      console.log((words[i][j].startScore + words[i][j].frequency) + " " + startHighest);

      if (words[i][j].startScore + words[i][j].frequency >= startHighest) {
        start = words[i][j].word;
        startHighest = words[i][j].startScore + words[i][j].frequency;
      }

      if (words[i][j].endScore + words[i][j].frequency >= endHighest) {
        end = words[i][j].word;
        endHighest = words[i][j].endScore + words[i][j].frequency;
      }

      if (words[i][j].frequency >= freqFirst) {
        freqThird = freqSecond;
        freqSecond = freqFirst;
        freqFirst = words[i][j].frequency;
      }
    }
  }

  var middle;

  for (var k in words) {
    for (var l in words[k]) {
      if ((words[k][l].frequency == freqFirst || words[k][l].frequency == freqSecond || words[k][l].frequency == freqThird) && Math.floor(Math.random() * sentenceLength) == 0) {
        middle += " " + words[k][l].word;
      }
    }
  }

  document.getElementById("output").innerHTML += " " + start + middle + " " + end + ".";
}
