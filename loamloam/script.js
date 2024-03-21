let decklist = [
    {
        'name': 'Life_from_the_Loam',
        'copies': 8,
        'file': 'uma-172-life-from-the-loam.jpg',
        'in_deck': true
    },
    {
        'name': 'The_Binding_of_the_Titans',
        'copies': 4,
        'file': 'cmm-886-the-binding-of-the-titans.jpg',
        'in_deck': true
    },
    {
        'name': 'Counterspell',
        'copies': 4,
        'file': 'ema-43-counterspell.jpg',
        'in_deck': true
    },
    {
        'name': 'Oonas_Grace',
        'copies': 4,
        'file': 'ema-63-oona-s-grace.jpg',
        'in_deck': true
    },
    {
        'name': 'Reclaim',
        'copies': 4,
        'file': 'ori-195-reclaim.jpg',
        'in_deck': true
    },
    {
        'name': 'Bazaar_of_Baghdad',
        'copies': 4,
        'file': 'vma-294-bazaar-of-baghdad.jpg',
        'in_deck': true
    },
    {
        'name': 'Misty_Rainforest',
        'copies': 4,
        'file': 'mh2-250-misty-rainforest.jpg',
        'in_deck': true
    },
    {
        'name': 'Hedge_Maze',
        'copies': 4,
        'file': 'mkm-262-hedge-maze.jpg',
        'in_deck': true
    },
    {
        'name': 'Forest',
        'copies': 2,
        'file': 'mh3-308-forest.jpg',
        'in_deck': true
    },
    {
        'name': 'Island',
        'copies': 2,
        'file': 'mh3-305-island.jpg',
        'in_deck': true
    },
    {
        'name': 'Dandan',
        'copies': 10,
        'file': 'tsb-19-dandan.jpg',
        'in_deck': false
    },
    {
        'name': 'Memory_Lapse',
        'copies': 8,
        'file': 'ema-60-memory-lapse.jpg',
        'in_deck': false
    }
];

window.onload = function () {
    createDecklists();
    createCards();
    fillCards();

    norefAnchors();
};

function createCards() {
    let card_groups = document.getElementsByClassName('mtgcards');

    for (let i in card_groups) {
        if (card_groups[i].classList !== undefined) {
            let last_name = '';
            let last_group = null;

            let classes = card_groups[i].className.split(' ');

            for (let j in classes) {
                if (j > 0) {
                    let stacked = classes[j] === last_name;

                    if (!stacked) last_group = createElement('div', 'stack flex_row center', '', card_groups[i]);

                    createElement('img', 'mtgcard ' + classes[j] + (stacked ? ' stacked' : ''), '', last_group);

                    last_name = classes[j];
                }
            }
        }
    }
}

function fillCards() {
    let cards = document.getElementsByClassName('mtgcard');

    for (let i in cards) {
        if (cards[i].classList !== undefined) {
            let classes = cards[i].className.split(' ');

            for (let j in decklist) {
                if (decklist[j].name.toLowerCase() === classes[1].toLowerCase()) {
                    cards[i].setAttribute('src', 'images/' + decklist[j].file);
                    break;
                }
            }
        }
    }
}

function createDecklists() {
    let decklists = document.getElementsByClassName('mtgdecklist');

    for (let i in decklists) {
        if (decklists[i].classList !== undefined) {
            let cards = createElement('div', 'mtgcards', '', decklists[i]);

            for (let j in decklist)
                if (decklist[j].in_deck)
                    for (let k = 0; k < decklist[j].copies; k++)
                        cards.setAttribute('class', cards.className + ' ' + decklist[j].name.toLowerCase());
        }
    }
}

function createElement(tag, class_name, inner, parent) {
    let temp = document.createElement(tag);
    temp.setAttribute('class', class_name);
    temp.innerHTML = inner;

    parent.appendChild(temp);

    return temp;
}

function norefAnchors() {
    let anchors = document.querySelectorAll('a');

    for (const i in anchors) {
        try {
            anchors[i].setAttribute('rel', 'noreferrer noopener');
            anchors[i].setAttribute('target', '_blank');
        }
        catch { }
    }
}