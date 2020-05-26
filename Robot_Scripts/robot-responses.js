/*
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



var response; //Final result to be outputted
var fomulated; //Bool to tell if response has been accepted and created
var wordTypes; //Array of classified words

//Final function before pushing back to the main script
function formulateResponse(phraseWords) {
  sentenceParts(phraseWords);

  if (fomulated == true) {
    addLog(inputField.value, response);
  }
}

//Checks each word in the input and classifies it
function sentenceParts(words) {
  wordTypes = [];
  var description = "";

  var i;
  for (i = 0; i < words.length; i++) {
    if (doesContain(greetings, words[i])) {
      wordTypes[i] = "{GREETING WORD}";
    }
    else if (doesContain(interrogators, words[i])) {
      wordTypes[i] = "{QUESTION WORD}";
    }
    else if (doesContain(determiners, words[i])) {
      wordTypes[i] = "{DETERMINER}";
    }
    else if (doesContain(conjuctions, words[i])) {
      wordTypes[i] = "(CONJUNCTION)";
    }
    else if (doesContain(adjectives, words[i])) {
      wordTypes[i] = "{ADJECTIVE}";
    }
    else if (doesContain(adverbs, words[i])) {
      wordTypes[i] = "{ADVEB}";
    }
    else if (doesContain(nouns, words[i])) {
      wordTypes[i] = "{NOUN}";
    }
    else if (doesContain(verbs, presentTensed(words[i], 1)) || doesContain(verbs, presentTensed(words[i], 2)) || doesContain(verbs, words[i])) {
      wordTypes[i] = "{VERB}";
    }
    else {
      wordTypes[i] = "{OTHER}";
    }
  }

  //Spits out all the classifications together
  var j;
  for (j = 0; j < wordTypes.length; j++) {
    if (wordTypes[j] != null) {
      description = description + wordTypes[j];

      if (j != wordTypes.length - 1) {
        description = description + "-";
      }
    }
  }

  console.log(description);
}
