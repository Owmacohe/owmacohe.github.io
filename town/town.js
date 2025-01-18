let deck = [];
let hand = [];

let logElement;
let landsElement;
let nonlandsElement;
let cardsCountElement;

let turns = 0;
let mana = 0;

window.onload = async function () {
    let decklist = await getDecklist();

    for (let i = 0; i < decklist.length; i++) {
        let card = await getCard(decklist[i][1]);

        for (let j = 0; j < decklist[i][0]; j++)
            deck.push(card.data[0]);
    }

    console.log(deck);

    logElement = document.getElementById('log');
    landsElement = document.getElementById('lands');
    nonlandsElement = document.getElementById('nonlands');
    cardsCountElement = document.getElementById('cardsCount');

    drawCard();
    drawCard();
    drawCard();
    drawCard();
    drawCard();
    drawCard();

    turn();
}

function log(message) {
    logElement.innerHTML += '<br>' + message;
}

function setCardsCount() {
    cardsCountElement.innerText = 'Cards in hand: ' + hand.length;
}

function turn() {
    turns++;

    drawCard();

    log('<strong>Turn ' + turns + '</strong>');

    let land = getLand();

    if (land !== null) {
        playCard(land);
        mana++;
    }

    let nonland = getNonland();

    if (nonland !== null) playCard(nonland);

    setTimeout(turn, 2000);
}

function getLand() {
    for (let i = 0; i < hand.length; i++)
        if (hand[i].type_line.includes('Land'))
            return hand[i];

    return null;
}

function getNonland() {
    for (let i = 0; i < hand.length; i++)
        if (!hand[i].type_line.includes('Land') && hand[i].cmc <= mana)
            return hand[i];

    return null;
}

function drawCard() {
    let index = Math.floor(Math.random() * deck.length);
    let card = deck[index];
    deck.splice(index, 1);

    hand.push(card);

    setCardsCount();
}

function playCard(card) {
    let index = hand.indexOf(card);
    hand.splice(index, 1);

    let phrase = '{0}';

    if (card.type_line.includes('Land')) {
        phrase = '{0} is settled';

        createImage(landsElement, card.image_uris.large);
    }
    else {
        if (card.type_line.includes('Creature')) phrase = '{0} is born';
        if (card.type_line.includes('Sorcery') || card.type_line.includes('Instant')) phrase = '{0} occurs';
        if (card.type_line.includes('Enchantment')) phrase = '{0} manifests';
        if (card.type_line.includes('Artifact')) phrase = '{0} is constructed';

        createImage(nonlandsElement, card.image_uris.large);
    }

    logElement.innerText += '\n' + phrase.format(card.name);

    setCardsCount();
}