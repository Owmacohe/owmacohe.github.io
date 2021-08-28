function PlayerCharacter(r, c, health, strength, magic, hit, block, charisma, intelligence, luck) {
  this.race = r || "";
  this.class = c || "";

  this.health = health || 0;
  this.strength = strength || 0;
  this.magic = magic || 0;

  this.hit = hit || 0;
  this.block = block || 0;

  this.charisma = charisma || 0;
  this.intelligence = intelligence || 0;
  this.luck = luck || 0;
}

var hasAddedRace = false;
var hasAddedClass = false;
var pc;

window.onload = function() {
  updateStats(true);
}

function addRace(raceType) {
  if (!hasAddedRace) {
    pc.race = raceType;

    switch (raceType) {
      case 'human':
        pc.health = 10;
        pc.strength = 10;

        var temp = Math.floor(Math.random() * 3);
        switch (temp) {
          case 0:
            pc.charisma += 2;
            break;
          case 1:
            pc.intelligence += 2;
            break;
          case 2:
            pc.luck += 2;
            break;
        }

        break;
      case 'kromacvin':
        pc.health = 10;
        pc.strength = 8;
        pc.intelligence += 2;
        break;
      case 'devil':
        pc.health = 8;
        pc.strength = 12;
        pc.luck += 2;
        break;
      case 'dryad':
        pc.health = 12;
        pc.strength = 6;
        pc.charisma += 2;
        break;
    }

    hasAddedRace = true;
    updateStats(false);
  }
}

function addClass(classType) {
  if (!hasAddedClass) {
    pc.class = classType;

    switch (classType) {
      case 'brute':
        pc.hit = 4;
        pc.block = 0.5;
        pc.magic = 0;
        pc.luck += 2;
        break;
      case 'caster':
        pc.hit = 3;
        pc.block = 0.4;
        pc.magic = 4;
        pc.intelligence += 2;
        break;
      case 'healer':
        pc.hit = 2;
        pc.block = 0.6;
        pc.magic = 2;
        pc.charisma += 2;
        break;
    }

    hasAddedClass = true;
    updateStats(false);
  }
}

function updateStats(isReset) {
  if (isReset) {
    document.getElementById('stats').innerHTML = 'Stats';

    pc = new PlayerCharacter("", "", 0, 0, 0, 0, 0, 0, 0, 0);

    hasAddedClass = false;
    hasAddedRace = false;
  }
  else {
    document.getElementById('stats').innerHTML = 'Stats (' + capitalize(pc.race) + ' ' + capitalize(pc.class) + ')';
  }

  setStat('health', pc.health);
  setStat('strength', pc.strength);
  setStat('magic', pc.magic);

  setStat('hit', pc.hit);
  setStat('block', pc.block);

  setStat('charisma', pc.charisma);
  setStat('intelligence', pc.intelligence);
  setStat('luck', pc.luck);
}

function setStat(id, value) {
  document.getElementById(id).innerHTML = capitalize(id) + ': ' + value;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
