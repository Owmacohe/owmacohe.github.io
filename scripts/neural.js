window.onload = function() {
  document.getElementById("input").value = "";
}

var wordScores = [];
var sentenceLength = 0;

function wordParse() {
  var text = document.getElementById("input").value.replace(/[,\n\/#!?$%\^&\*;:{}=\-_`~()]/g,"");

  if (text[text.length - 1] == ".") {
    text = text.substring(0, text.length - 1);
  }

  var sentences = text.split(". ");
  var words = [];

  //console.log(text[text.length - 1]);

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
  var freqFourth = 0;
  var freqFifth = 0;

  for (var j in wordScores) {
    if (wordScores[j].startScore >= startHighest) {
      start = wordScores[j].word;
      startHighest = wordScores[j].startScore;
    }

    if (wordScores[j].endScore >= endHighest) {
      end = wordScores[j].word;
      endHighest = wordScores[j].endScore;
    }

    if (wordScores[j].frequency >= freqFirst) {
      freqFifth = freqFourth;
      freqFourth = freqThird;
      freqThird = freqSecond;
      freqSecond = freqFirst;
      freqFirst = wordScores[j].frequency;
    }
  }

  var middle = "";
  var lastAdded = "";

  for (var k in wordScores) {
    var chance = sentenceLength / 6;

    if (k > 0) {
      for (var l in wordScores[k - 1].precursor) {
        if (wordScores[k - 1].word == lastAdded) {
          //console.log(wordScores[k - 1].precursor + " " + wordScores[k].word);
          chance = sentenceLength / 1.5;
        }
      }
    }

    if (Math.floor(Math.random() * sentenceLength) <= chance) {
      middle += " " + wordScores[k].word;
      lastAdded = wordScores[k].word;
    }
  }

  document.getElementById("output").innerHTML += " " + start + middle + " " + end + ".";
}
