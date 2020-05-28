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
var formulated; //Bool to tell if response has been accepted and created
var wordTypes; //Array of classified words
var senTypes = []; //Helps sentenceFiltering to keep track of which type of senetence has been detected, and where

//Final function before pushing back to the main script
function formulateResponse(phraseWords) {
  if (awaitingAnswer == true && currentChainSpot <= answerChainLength) {
    giveAnswer();
  }

  sentenceFiltering(phraseWords);
  sentenceParts(phraseWords);

  //console.log(response);

  if (formulated == true) {
    addLog(inputField.value, response);
  }
}

function sentenceFiltering(words) {
  /* ~~~ Start sentence checking ~~~ */

  //Greeting
  for (var i in words) {
    if (doesContain(greetings, words[i])) {
      response = randWord(greetings);
      senTypes[senTypes.length] = "greeting";
      senTypes[senTypes.length] = i;
      formulated = true;
    }
  }

  //Interrogatory
  questionCheck(words);

  /* ~~~ End sentence checking ~~~ */



  /* ~~~ Start type responses ~~~ */
  if (doesContain(senTypes, "interrogatory")) {
    var j;
    for (j = 0; j < words.length; j++) {
      if (doesContain(interrogators, words[j]) && words[j+1] == "are" && words[j+2] == "you") {
        switch (words[j]) {
          case "who":
            if (botQualities.who == "BOT") {
              setAnswerVariables(["I don't have a name yet. What shall my name be?", "Sounds good! What's your name?", "Nice to meet you."], ["string", "string", "string"], 2);
              targetVars = [botQualities.who, userQualities.who];
            }
            else {
              response = "I am " + botQualities.who;
            }
            break;
          case "what":
            response = "I am " + botQualities.what;
            break;
          case "where":
            response = "I am " + botQualities.where;
            break;
          case "why":
            response = "I am " + botQualities.why;
            break;
          case "when":
            response = "My first GitHub commit was on " + botQualities.when;
            break;
          case "how":
            response = "I am " + botQualities.how;
            break;
        }
        formulated = true;
      }
    }
  }

  /* ~~~ End type responses ~~~ */
}

//Determines if its interrogatory
function questionCheck(words) {
  for (var i in words) {
    if (doesContain(interrogators, words[i])) {
      senTypes[senTypes.length] = "interrogatory";
      senTypes[senTypes.length] = i;
    }
  }
}

//Checks each word in the input and classifies it
function sentenceParts(words) {
  wordTypes = [];
  var description = "";

  for (var i in words) {
    if (doesContain(names, words[i])) {
      wordTypes[i] = "{NAME}";
    }
    else if (doesContain(greetings, words[i])) {
      wordTypes[i] = "{GREETING WORD}";
    }
    else if (doesContain(interrogators, words[i])) {
      wordTypes[i] = "{INTERROGATOR}";
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
  for (var j in wordTypes) {
    if (wordTypes[j] != null) {
      description = description + wordTypes[j];

      if (j != wordTypes.length - 1) {
        description = description + "-";
      }
    }
  }

  console.log(description);
}

var awaitingAnswer = false;
var answer;

var answerQuestions = [];
var answerTypes = [];
var targetVars;
var answerChainLength;
var currentChainSpot;

function setAnswerVariables(aQ, aT, aCL) {
  currentChainSpot = 0;
  answerQuestions = aQ;
  response = answerQuestions[currentChainSpot];

  awaitingAnswer = true;
  answerTypes = aT;
  answerChainLength = aCL;
}

function giveAnswer() {
  answer = inputField.value;

  if (typeof answer == answerTypes[currentChainSpot]) {
    targetVars[currentChainSpot][0] = inputField.value;

    response = answerQuestions[currentChainSpot + 1];

    formulated = true;
    currentChainSpot++;
  }

  if (currentChainSpot >= answerChainLength) {
    awaitingAnswer = false;
  }
}
