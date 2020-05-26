//Formats any given string by setting it to lower case and removing punctiation
function formatString(string) {
  return string.toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-`'~()]/g, "");
}

//Capitalizes a given string
function capitalized(string) {
  var letters = string.split("");
  string = "";

  var i;
  for (i = 1; i < letters.length; i++) {
    if (string == "") {
      string = letters[0].toUpperCase();
    }

    string = string + letters[i];
  }

  return string;
}

//Adds any punctuation to the end of a string
function punctuated(string, punc) {
  return string + punc;
}

//Pluralizes a string
function pluralized(string) {
  if (string[string.length - 1] != "y") {
    string = string + "s";
  }
  else if (string[string.length - 1] == "y") {
    var splitString;

    splitString = string.split("");
    string = "";

    splitString.splice(splitString.length - 1, 1);

    var i;
    for (i = 0; i < splitString.length; i++) {
      string = string + splitString[i];
    }

    string = string + "ies";
  }

  return string;
}

//Makes a word not pluralized anymore
function unPluralized(string) {
  var splitString;

  if (string[string.length - 1] == "s") {
    splitString = string.split("");
    string = "";
    splitString.splice(splitString.length - 1, 1);

    if (splitString[splitString.length - 1] == "e" && splitString[splitString.length - 2] == "i") {
      splitString.splice(splitString.length - 1, 1);
      splitString[splitString.length - 1] = "y";
    }

    var i;
    for (i = 0; i < splitString.length; i++) {
      string = string + splitString[i];
    }
  }
  else if (string[string.length - 1] == "e") {
    splitString = string.split("");
    string = "";
    splitString.splice(splitString.length - 1, 1);
    splitString.splice(splitString.length - 1, 1);

    var i;
    for (i = 0; i < splitString.length; i++) {
      string = string + splitString[i];
    }
  }

  return string;
}

//Turns a word into its past tense equivalent
function pastTensed(string) {
  if (string[string.length - 1] == "e") {
    string = string + "d";
  }
  else if (string[string.length - 1] == "y") {
    var splitString = string.split("");
    string = "";
    splitString.splice(splitString.length - 1, 1);
    splitString[splitString.length] = "ied";

    var i;
    for (i = 0; i < splitString.length; i++) {
      string = string + splitString[i];
    }
  }
  else {
    string = string + "ed";
  }

  return string;
}

//Turns a word into its present tense equivalent
function presentTensed(string, removedLetters) {
  var splitString;

  if (string[string.length - 1] == "d" && string[string.length - 2] == "e" && string[string.length - 3] == "i") {
    splitString = string.split("");
    string = "";
    splitString.splice(splitString.length - 1, 1);
    splitString.splice(splitString.length - 1, 1);
    splitString.splice(splitString.length - 1, 1);
    splitString[splitString.length] = "y";

    var i;
    for (i = 0; i < splitString.length; i++) {
      string = string + splitString[i];
    }
  }
  else if (string[string.length - 1] == "d" && string[string.length - 2] == "e" && removedLetters == 1) {
    splitString = string.split("");
    string = "";
    splitString.splice(splitString.length - 1, 1);

    var i;
    for (i = 0; i < splitString.length; i++) {
      string = string + splitString[i];
    }
  }
  else if (string[string.length - 1] == "d" && string[string.length - 2] == "e" && removedLetters == 2) {
    splitString = string.split("");
    string = "";
    splitString.splice(splitString.length - 1, 1);
    splitString.splice(splitString.length - 1, 1);

    var i;
    for (i = 0; i < splitString.length; i++) {
      string = string + splitString[i];
    }
  }

  return string;
}
