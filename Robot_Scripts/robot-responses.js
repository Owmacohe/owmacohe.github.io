//owen jumped and lindsey decided

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

var response;
var responseTemp;
var senType;
var simpleFragments = [];
var responseFormulated;

function sentenceType(words) {
  response = null;
  responseTemp = null;
  senType = "none";
  simpleFragments = [];

  //Greeting checking
  if (doesContain(greetings, words[0]) == true) {
    senType = "greeting";

    response = punctuated(capitalized(randWord(greetings)), "!");
    responseFormulated = true;
  }

  //Simple checking
  simpleCheck(words);

  //Compound checking
  compoundCheck(words);

  if (senType == "simple") {
    response = capitalized(punctuated(responseTemp, "?"));
    responseFormulated = true;
  }

  if (senType == "compound") {
    var i;
    for (i = 0; i < simpleFragments.length; i++) {
      if (response == null) {
        response = simpleFragments[i];
      }
      else {
        response = capitalized(response + " and " + simpleFragments[i]);
      }
    }

    response = punctuated(response, "?");
    responseFormulated = true;
  }

  /*
  switch (senType) {
    case "simple":
      response = responseTemp;
      responseFormulated = true;
      break;
    case "compound":
      response = response + " and " + responseTemp;
      responseFormulated = true;
      break;
  }
  */

  if (senType != "none") {
    console.log("***** " + senType.toUpperCase() + " *****");
  }
}

function simpleCheck(words) {
  var i;
  for (i = 0; i < words.length; i++) {
    var j;
    for (j = 0; j < verbs.length; j++) {
      if (doesContain(names, words[i]) == true && words[i+1] == verbs[j].past) {
        senType = "simple";
        responseTemp = "what did " + words[i] + " " + verbs[j].present;
        simpleFragments[simpleFragments.length] = responseTemp;
      }
      else if (doesContain(names, words[i]) == true && ((words[i+1] == "didn't" && words[i+2] == verbs[j].present) || (words[i+1] == "did" && words[i+2] == "not" && words[i+3] == verbs[j].present))) {
        senType = "simple";
        responseTemp = "what didn't " + words[i] + " " + verbs[j].present;
        simpleFragments[simpleFragments.length] = responseTemp;
      }
      else if (doesContain(determiners, words[i]) && doesContain(nouns, words[i+1]) && words[i+2] == verbs[j].past) {
        senType = "simple";
        responseTemp = "what did " + words[i] + " " + words[i+1] + " " + verbs[j].present;
        simpleFragments[simpleFragments.length] = responseTemp;
      }
      else if (doesContain(determiners, words[i]) && doesContain(nouns, words[i+1]) && ((words[i+2] == "didn't" && words[i+3] == verbs[j].present) || (words[i+2] == "did" && words[i+3] == "not" && words[i+4] == verbs[j].present))) {
        senType = "simple";
        responseTemp = "what didn't " + words[i] + " " + words[i+1] + " " + verbs[j].present;
        simpleFragments[simpleFragments.length] = responseTemp;
      }
    }
  }
}

function compoundCheck(words) {
  if (simpleFragments.length > 1) {
    senType = "compound";
  }
}

function formulateResponse(phraseWords) {
  sentenceType(phraseWords);

  if (responseFormulated == true) {
    addLog(userName, inputField.value);
    addLog(botName, response);
  }
}
