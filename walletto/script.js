var races = ["Fey", "Undead", "Humanoid", "Orcish", "Elemental", "Construct"];
var classes = ["Wizard", "Fighter", "War Mage"];
var spells = ["Gravel Slap", "Ice Sweep", "Magic Teapot", "Cheese Shackles", "Pillow Armour", "Ember Bell"];
var weapons = ["Club", "Bow", "Staff", "Sword", "Spear", "Knife"];
var inventories = ["Rope", "Book", "Drugs", "Trinket", "Costume", "Companion", "Food", "Cards", "Poison", "Artifact", "Explosive", "Instrument"];

function generateCharacter() {
  var stats = [];
  stats[0] = rollDie(20); //STRN
  stats[1] = rollDie(20); //DEXT
  stats[2] = rollDie(20); //INTL
  stats[3] = rollDie(20); //MAGI
  stats[4] = stats[0]; //HLTH
  stats[5] = Math.ceil((stats[0] + stats[1]) / 2) //ARMR

  var myRace = rollArray(races);
  var myClass = rollArray(classes);
  var mySpells = "";
  var spellsTemp = [];
  var myWeapons = "";
  var weaponsTemp = [];
  var myInventory = "";
  var inventoryTemp = [];

  switch (myClass) {
    case "Wizard":
      for (var i = 0; i < 4; i++) {
        spellsTemp[i] = rollArray(spells);
        spells.splice(spells.indexOf(spellsTemp[i]), 1);
        mySpells += spellsTemp[i] + "<br>";
      }

      for (var j = 0; j < 2; j++) {
        weaponsTemp[i] = rollArray(weapons);
        weapons.splice(weapons.indexOf(weaponsTemp[i]), 1);
        myWeapons += weaponsTemp[i] + "<br>";
      }
      break;
    case "Fighter":
      stats[0] += " +3";
      stats[1] += " +3";

      mySpells = "No spells";

      for (var j = 0; j < 2; j++) {
        weaponsTemp[i] = rollArray(weapons);
        weapons.splice(weapons.indexOf(weaponsTemp[i]), 1);
        myWeapons += weaponsTemp[i] + " +2<br>";
      }
      break;
    case "War Mage":
      stats[0] += " +2";

      for (var i = 0; i < 2; i++) {
        spellsTemp[i] = rollArray(spells);
        spells.splice(spells.indexOf(spellsTemp[i]), 1);
        mySpells += spellsTemp[i] + "<br>";
      }

      for (var j = 0; j < 2; j++) {
        weaponsTemp[i] = rollArray(weapons);
        weapons.splice(weapons.indexOf(weaponsTemp[i]), 1);
        myWeapons += weaponsTemp[i] + " +1<br>";
      }
      break;
  }

  for (var k = 0; k < 4; k++) {
    inventoryTemp[i] = rollArray(inventories);
    inventories.splice(inventories.indexOf(inventoryTemp[i]), 1);
    myInventory += inventoryTemp[i] + "<br>";
  }

  document.getElementById("r").innerHTML = myRace;
  document.getElementById("c").innerHTML = myClass;
  document.getElementById("s").innerHTML = mySpells;
  document.getElementById("w").innerHTML = myWeapons;
  document.getElementById("i").innerHTML = myInventory;
  document.getElementById("stats").innerHTML =
    "STRN = " + stats[0] +
    "<br>DEXT = " + stats[1] +
    "<br>INTL = " + stats[2] +
    "<br>MAGI = " + stats[3] +
    "<br>HLTH = " + stats[4] +
    "<br>ARMR = " + stats[5];

  spells = ["Gravel Slap", "Ice Sweep", "Magic Teapot", "Cheese Shackles", "Pillow Armour", "Ember Bell"];
  weapons = ["Club", "Bow", "Staff", "Sword", "Spear", "Knife"];
  inventories = ["Rope", "Book", "Drugs", "Trinket", "Costume", "Companion", "Food", "Cards", "Poison", "Artifact", "Explosive", "Instrument"];
}

var locations = [
  "A wizard's tower",
  "An sunken city",
  "A forest of leafless trees",
  "A leech-infested swamp",
  "Sprawling city rooftops",
  "Twin mountain peaks",
  "A caravan route",
  "The high seas",
  "A non-euclidean labyrinth",
  "A busy factory"
];

var motives = [
  "Escaping the location",
  "Defeating the antagonist",
  "Claiming a bounty",
  "Following orders",
  "Seeking lost treasure",
  "Seeking revenge",
  "Going on vacation",
  "Following a map",
  "Closing a portal",
  "Breaking up a crime ring"
];

var antagonists = [
  "A dark sorcerer",
  "A spider hydra",
  "A gang of sentient armor sets",
  "One or more doppelgängers",
  "An eldritch horror",
  "A fallen angel",
  "A collectively sentient swarm of beetles",
  "The pressures of bureaucracy",
  "An insane royal",
  "An animated dragon automaton"
];

function generateAdventure() {
  document.getElementById("l").innerHTML = rollArray(locations);
  document.getElementById("m").innerHTML = rollArray(motives);
  document.getElementById("a").innerHTML = rollArray(antagonists);
}

function rollArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function rollDie(faces) {
  var temp = Math.floor(Math.random() * faces) + 1;

  if (temp < 5) {
    temp = 5;
  }

  return temp;
}
