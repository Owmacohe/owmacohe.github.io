var races = ["Fey", "Undead", "Humanoid", "Orcish", "Elemental", "Construct"];
var classes = ["Wizard", "Fighter", "War Mage"];
var spells = ["Gravel Slap", "Ice Sweep", "Magic Teapot", "Cheese Shackles", "Pillow Armour", "Ember Bell"];
var weapons = ["Club", "Bow", "Staff", "Sword", "Spear", "Knife"];
var inventories = ["Rope", "Book", "Drugs", "Trinket", "Costume", "Companion", "Food", "Cards", "Poison", "Artifact", "Explosive", "Instrument"];

function generate() {
  var stats = [];
  stats[0] = rollDie(20, true); //STRN
  stats[1] = rollDie(20, true); //DEXT
  stats[2] = rollDie(20, true); //INTL
  stats[3] = rollDie(20, true); //MAGI
  stats[4] = stats[0]; //HLTH
  stats[5] = Math.ceil((stats[0] + stats[1]) / 2) //ARMR

  var myRace = rollArray(races);
  var myClass = rollArray(classes);
  var mySpells = "";
  var myWeapons = "";
  var myInventory = "";

  document.getElementById("r").innerHTML = myRace;
  document.getElementById("c").innerHTML = myClass;
  document.getElementById("s").innerHTML = mySpells;
  document.getElementById("w").innerHTML = myWeapons;
  document.getElementById("i").innerHTML = myInventory;
  document.getElementById("stats").innerHTML = "STRN = " + stats[0] + "<br>DEXT = " + stats[1] + "<br>INTL = " + stats[2] + "<br>MAGI = " + stats[3] + "<br>HLTH = " + stats[4] + "<br>ARMR = " + stats[5];
}

function rollArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function rollDie(faces, isStat) {
  var temp = Math.floor(Math.random() * faces) + 1;

  if (isStat && temp < 5) {
    temp = 5;
  }

  return temp;
}
