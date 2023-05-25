var patterns = [
  "-+*%$%*+",
  "-•=!#!=•",
  "-<+{?}+>",
  "-z[(&)]z",
  "-odO0Obo"
];

function setPattern() {
  var chosenPattern = Math.floor(Math.random() * patterns.length);

  for (var i = 0; i < 11; i++) {
    document.getElementById("curvedText").innerHTML += patterns[chosenPattern];
  }

  new CircleType(document.getElementById("curvedText"));
}
