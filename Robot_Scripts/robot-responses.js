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

  var i;
  for (i = 0; i < nouns.length; i++) {
    var j;
    for (j = 0; j < verbs.length; j++) {
      var k;
      for (k = 0; k < names.length; k++) {

        //Simple checking
        if (words[0] == names[k] && words[words.length - 1] == verbs[j].past) {
          sentenceValues[0] = true;

          response = "What did " + words[0] + " " + verbs[j].present + "?";
          responseFormulated = true;
        }
        else if (words[0] == names[k] && ((words[1] == "didn't") || (words[1] == "did" && words[2] == "not")) && words[words.length - 1] == verbs[j].present) {
          sentenceValues[0] = true;

          response = "What didn't " + words[0] + " " + verbs[j].present + "?";
          responseFormulated = true;
        }
      }
    }
  }

  //Spits out sentence type
  var l;
  for (l = 0; l < 8; l++) {
    if (sentenceValues[l] == true) {
      console.log(sentences[l].toUpperCase());
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
