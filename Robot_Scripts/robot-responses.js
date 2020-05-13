/* Sentence structures

~~~ Basic ~~~
Simple sentence: Judy laughed.
Compound sentence: Judy laughed and Jimmy cried.
Complex sentence: Jimmy cried when Judy laughed.
Compound-complex sentence: Judy laughed and Jimmy cried when the clowns ran past their seats.

~~~ Functional ~~~
Declarative sentence: Babies cry.
Interrogative sentence: Why do babies cry?
Imperative sentence: Please be quiet.
Exclamatory sentence: Shut up!

*/

function sentenceType(words) {
  var sentences = ["simple", "compound", "complex", "compound_complex", "declarative", "interrogative", "imperative", "exclamatory"];
  var sentenceValues = [false, false, false, false, false, false, false, false];

  var l;
  for (l = 0; l < words.length; l++) {
    var m;
    for (m = 0; m < determiners.length; m++) {
      var k;
      for (k = 0; k < names.length; k++) {
        var j;
        for (j = 0; j < verbs.length; j++) {
          var i;
          for (i = 0; i < nouns.length; i++) {

            //Simple checking
            if (words[l] == names[k] && words[l+1] == verbs[j].past) {
              sentenceValues[0] = true;

              response = "What did " + words[l] + " " + verbs[j].present + "?";
              responseFormulated = true;

              break;
            }
            else if (words[l] == names[k] && ((words[l+1] == "didn't" && words[l+2] == verbs[j].present) || (words[l+1] == "did" && words[l+2] == "not" && words[l+3] == verbs[j].present))) {
              sentenceValues[0] = true;

              response = "What didn't " + words[l] + " " + verbs[j].present + "?";
              responseFormulated = true;

              break;
            }
            else if (words[l] == determiners[m] && words[l+1] == nouns[i] && words[l+2] == verbs[j].past) {
              sentenceValues[0] = true;

              response = "What did " + words[l] + " " + words[l+1] + " " + verbs[j].present + "?";
              responseFormulated = true;

              break;
            }
            else if (words[l] == determiners[m] && words[l+1] == nouns[i] && ((words[l+2] == "didn't" && words[l+3] == verbs[j].present) || (words[l+2] == "did" && words[l+3] == "not" && words[l+4] == verbs[j].present))) {
              sentenceValues[0] = true;

              response = "What didn't " + words[l] + " " + words[l+1] + " " + verbs[j].present + "?";
              responseFormulated = true;

              break;
            }
          }
        }
      }
    }
  }

  /*
  var i = 0;
  var j = 0;
  var k = 0;
  var l = 0;

  var loopNum;
  for (loopNum = 0; loopNum < (words.length+names.length+verbs.length+nouns.length); loopNum++) {

    console.log(words[i] + " " + names[j]);
    //Simple checking
    if (words[i] == names[j] && words[i+1] == verbs[k].past) {
      sentenceValues[0] = true;

      response = "What did " + words[i] + " " + verbs[k].present + "?";
      responseFormulated = true;
    }
    else if (words[i] == names[j] && ((words[i+1] == "didn't" && words[i+2] == verbs[k].present) || (words[i+1] == "did" && words[i+2] == "not" && words[i+3] == verbs[k].present))) {
      sentenceValues[0] = true;

      response = "What didn't " + words[i] + " " + verbs[k].present + "?";
      responseFormulated = true;
    }

    //Elses
    else if (words[i] < names[j] || words[i] < verbs[k] || words[i] < nouns[l]) {
      i++;
    }
    else if (names[j] < verbs[k] || names[j] < nouns[l] || names[j] < verbs[k]) {
      j++;
    }
    else if (verbs[k] < nouns[l] || verbs[k] < words[i] || words[i] < names[j]) {
      k++;
    }
    else if (nouns[l] < words[i] || nouns[l] < names[j] || nouns[l] < verbs[k]) {
      l++;
    }
  }
  */

  //Spits out sentence type
  var z;
  for (z = 0; z < 8; z++) {
    if (sentenceValues[z] == true) {
      console.log(sentences[z].toUpperCase());
    }
  }
}

var response;

function formulateResponse(phraseWords) {

  //Greetings
  var i;
  for (i = 0; i < greetings.length; i++) {
    if (formatString(phraseWords[0]) == greetings[i] || formatString(phraseWords[phraseWords.length - 1]) == greetings[i]) {
      response = randWord(greetings);
      responseFormulated = true;
    }
  }

  sentenceType(phraseWords);

  if (responseFormulated == true) {
    respond();
  }
}

function respond() {
  addLog("YOU", inputField.value);
  addLog(botName, response);
}
