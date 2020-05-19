function formulateResponse(phraseWords) {
  sentenceType(phraseWords);
  sentenceParts(phraseWords);

  if (responseFormulated == true) {
    addLog(inputField.value, response);
  }
}

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

//owen jumped and lindsey decided
//owen jumped when lindsey decided

var wordLog;

function sentenceParts(words) {
  wordTypes = [];
  var description = "";

  var i;
  for (i = 0; i < words.length; i++) {
    if (doesContain(greetings, words[i]) == true) {
      wordTypes[i] = "{GREETING WORD}";
    }
    else if (doesContain(interrogators, words[i]) == true) {
      wordTypes[i] = "{QUESTION WORD}";
    }
    else if (doesContain(determiners, words[i]) == true) {
      wordTypes[i] = "{DETERMINER}";
    }
    else if (doesContain(conjuctions, words[i]) == true) {
      wordTypes[i] = "(CONJUNCTION)";
    }
    else if (doesContain(nouns, unPluralized(words[i])) == true) {
      wordTypes[i] = "{NOUN}";
    }
    else if (doesContain(verbs, words[i]) == true) {
      wordTypes[i] = "{VERB}";
    }
    else if (doesContain(names, words[i]) == true) {
      wordTypes[i] = "{NAME}";
    }
    else if (words[i] == "and") {
      wordTypes[i] = "(AND)";
    }
    else {
      wordTypes[i] = "{OTHER}";
    }

    if (doesContain(verbs, words[i]) == true && doesContain(names, words[i-1]) == true) {
      wordTypes[i] = "[SIMPLE SENTENCE]";
      wordTypes.splice(i-1, 1);
    }
    else if ((doesContain(verbs, words[i]) == true && doesContain(nouns, words[i-1]) == true && doesContain(determiners, words[i-2]) == true) || (doesContain(verbs, words[i]) == true && words[i-1] == "didn't" && doesContain(names, words[i-2]) == true)) {
      wordTypes[i] = "[SIMPLE SENTENCE]";
      wordTypes.splice(i-1, 1);
      wordTypes.splice(i-2, 1);
    }
    else if ((doesContain(verbs, words[i]) == true && words[i-1] == "not" && words[i-2] == "did" && doesContain(names, words[i-3]) == true) || (doesContain(verbs, words[i]) == true && words[i-1] == "didn't" && doesContain(nouns, words[i-2]) == true && doesContain(determiners, words[i-3]) == true)) {
      wordTypes[i] = "[SIMPLE SENTENCE]";
      wordTypes.splice(i-1, 1);
      wordTypes.splice(i-2, 1);
      wordTypes.splice(i-3, 1);
    }
    else if (doesContain(verbs, words[i]) == true && words[i-1] == "not" && words[i-2] == "did" && doesContain(nouns, words[i-3]) == true && doesContain(determiners, words[i-4]) == true) {
      wordTypes[i] = "[SIMPLE SENTENCE]";
      wordTypes.splice(i-1, 1);
      wordTypes.splice(i-2, 1);
      wordTypes.splice(i-3, 1);
      wordTypes.splice(i-4, 1);
    }
  }

  var z;
  for (z = 0; z < wordTypes.length; z++) {
    if (wordTypes[z] != null) {
      description = description + wordTypes[z];

      if (z != wordTypes.length - 1) {
        description = description + "-";
      }
    }
  }

  console.log(description);
}

var response;
var senType;

var compoundTemp;
var compoundFragments;
var complexTemp;
var complexFragments;

var andDetected;
var conjDetected;

var responseFormulated;

function sentenceType(words) {
  response = null;
  senType = "none";

  compoundTemp = null;
  compoundFragments = [];
  complexTemp = null;
  complexFragments = [];

  andDetected = false;
  conjDetected = null;

  //Greeting checking
  if (doesContain(greetings, words[0]) == true) {
    /*
    senType = "greeting";

    response = punctuated(capitalized(randWord(greetings)), "!");
    */

    response = "You have made a greeting.";
    responseFormulated = true;
  }

  //Simple checking
  simpleCheck(words);

  //Compound checking
  compoundCheck(words);

  //Complex checking
  complexCheck(words);

  //Question checking
  questionCheck(words);

  if (senType == "simple") {
    //response = capitalized(punctuated(compoundTemp, "?"));

    response = "You have said a simple senence.";
    responseFormulated = true;
  }

  if (senType == "compound") {
    /*
    var i;
    for (i = 0; i < compoundFragments.length; i++) {
      if (response == null) {
        response = compoundFragments[i];
      }
      else {
        response = capitalized(response + " and " + compoundFragments[i]);
      }
    }

    response = punctuated(response, "?");
    */

    response = "You have said a compound senence.";
    responseFormulated = true;
  }

  if (senType == "complex") {
    /*
    var i;
    for (i = 0; i < complexFragments.length; i++) {
      if (response == null) {
        response = complexFragments[i];
      }
      else {
        response = capitalized(response + " " + conjDetected + " " + complexFragments[i]);
      }
    }

    response = punctuated(response, "?");
    */

    response = "You have said a complex senence.";
    responseFormulated = true;
  }

  if (senType == "interrogatory") {
    response = "You have posed a question.";
    responseFormulated = true;
  }

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

        compoundTemp = "what did " + capitalized(words[i]) + " " + verbs[j].present;
        compoundFragments[compoundFragments.length] = compoundTemp;

        if (conjDetected == null) {
          complexTemp = "what did " + capitalized(words[i]) + " " + verbs[j].present;
          complexFragments[complexFragments.length] = complexTemp;
        }
        else {
          complexTemp = capitalized(words[i]) + " " + verbs[j].past;
          complexFragments[complexFragments.length] = complexTemp;
        }
      }
      else if (doesContain(names, words[i]) == true && ((words[i+1] == "didn't" && words[i+2] == verbs[j].present) || (words[i+1] == "did" && words[i+2] == "not" && words[i+3] == verbs[j].present))) {
        senType = "simple";

        compoundTemp = "what didn't " + capitalized(words[i]) + " " + verbs[j].present;
        compoundFragments[compoundFragments.length] = compoundTemp;

        if (conjDetected == null) {
          complexTemp = "what didn't " + capitalized(words[i]) + " " + verbs[j].present;
          complexFragments[complexFragments.length] = complexTemp;
        }
        else {
          complexTemp = "didn't " + capitalized(words[i]) + " " + verbs[j].past;
          complexFragments[complexFragments.length] = complexTemp;
        }
      }
      else if (doesContain(determiners, words[i]) == true && doesContain(nouns, words[i+1]) && words[i+2] == verbs[j].past) {
        senType = "simple";

        compoundTemp = "what did " + words[i] + " " + words[i+1] + " " + verbs[j].present;
        compoundFragments[compoundFragments.length] = compoundTemp;

        if (conjDetected == null) {
          complexTemp = "what did " + words[i] + " " + words[i+1] + " " + verbs[j].present;
          complexFragments[complexFragments.length] = complexTemp;
        }
        else {
          complexTemp = words[i] + " " + words[i+1] + " " + verbs[j].past;
          complexFragments[complexFragments.length] = complexTemp;
        }
      }
      else if (doesContain(determiners, words[i]) == true && doesContain(nouns, words[i+1]) && ((words[i+2] == "didn't" && words[i+3] == verbs[j].present) || (words[i+2] == "did" && words[i+3] == "not" && words[i+4] == verbs[j].present))) {
        senType = "simple";

        compoundTemp = "what didn't " + words[i] + " " + words[i+1] + " " + verbs[j].present;
        compoundFragments[compoundFragments.length] = compoundTemp;

        if (conjDetected == null) {
          complexTemp = "what didn't " + words[i] + " " + words[i+1] + " " + verbs[j].present;
          complexFragments[complexFragments.length] = complexTemp;
        }
        else {
          complexTemp = "didn't " + words[i] + " " + words[i+1] + " " + verbs[j].past;
          complexFragments[complexFragments.length] = complexTemp;
        }
      }

      if (compoundFragments.length >= 1 && words[i] == "and") {
        andDetected = true;
      }

      if (compoundFragments.length >= 1 && doesContain(conjuctions, words[i]) == true) {
        conjDetected = words[i];
      }
    }
  }
}

function compoundCheck(words) {
  if (compoundFragments.length > 1 && andDetected == true) {
    senType = "compound";
  }
}

function complexCheck(words) {
  if (compoundFragments.length > 1 && conjDetected != null) {
    senType = "complex";
  }
}

function questionCheck(words) {
  var i;
  for (i = 0; i < words.length; i++) {
    if (doesContain(interrogators, words[i]) && words[i+1] == "are" && words[i+2] == "you") {
      senType = "interrogatory";
      //Responsd "I am ..."
    }
    else if (doesContain(interrogators, words[i]) && (words[i+1] == "are" || words[i+1] == "is") && doesContain(determiners, words[i+2]) && doesContain(nouns, unPluralized(words[i+3]))) {
      senType = "interrogatory";
      //Respond "... are/is ..."
    }
    else if (doesContain(interrogators, words[i]) && words[i][words[i].length - 1] == "s" && doesContain(determiners, words[i+1]) && doesContain(nouns, unPluralized(words[i+2]))) {
      senType = "interrogatory";
      //Respond "... are/is ..."
    }
  }
}
