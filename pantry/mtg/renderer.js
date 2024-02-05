let colours = [
    {
        'code': 'W',
        'pinlines': 'white',
        'bars': '#e8e1cf',
        'boxes': '#f1ede4',
        'hue': 0,
        'saturation': 100,
        'brightness': 150
    },
    {
        'code': 'U',
        'pinlines': 'blue',
        'bars': '#b8c7de',
        'boxes': '#dfe7f0',
        'hue': 160,
        'saturation': 300,
        'brightness': 100
    },
    {
        'code': 'B',
        'pinlines': 'black',
        'bars': '#c0bdb8',
        'boxes': '#e8e7e5',
        'hue': 0,
        'saturation': 0,
        'brightness': 50
    },
    {
        'code': 'R',
        'pinlines': 'red',
        'bars': '#eacbb6',
        'boxes': '#f0ded6',
        'hue': 315,
        'saturation': 400,
        'brightness': 80
    },
    {
        'code': 'G',
        'pinlines': 'green',
        'bars': '#bfc9c1',
        'boxes': '#d9e3db',
        'hue': 80,
        'saturation': 150,
        'brightness': 80
    }
];

window.onload = function() {
    create_card(
        'Healing Salve',
        'W',
        'healing_salve.jpg',
        'Instant',
        'LEA',
        'Choose one —\n• Target player gains 3 life.\n• Prevent the next 3 damage that would be dealt to any target this turn.',
        '',
        ['22 / 295 C', '1993', 'LEA • EN', 'Dan Frazier']
    );

    create_card(
        'Ancestral Recall',
        'U',
        'ancestral_recall.jpg',
        'Instant',
        'LEA',
        'Target player draws three cards.',
        '',
        ['47 / 295 R', '1993', 'LEA • EN', 'Mark Poole']
    );

    create_card(
        'Dark Ritual',
        'B',
        'dark_ritual.jpg',
        'Instant',
        'LEA',
        'Add BBB.',
        '',
        ['98 / 295 C', '1993', 'LEA • EN', 'Sandra Everingham']
    );

    create_card(
        'Lightning Bolt',
        'R',
        'lightning_bolt.jpg',
        'Instant',
        'LEA',
        'Lightning Bolt deals 3 damage to any target.',
        '',
        ['161 / 295 C', '1993', 'LEA • EN', 'Christopher Rush']
    );

    create_card(
        'Giant Growth',
        'G',
        'giant_growth.jpg',
        'Instant',
        'LEA',
        'Target creature gets +3/+3 until end of turn.',
        '',
        ['197 / 295 U', '1993', 'LEA • EN', 'Sandra Everingham']
    );
};

function create_card(card_name, card_cost, card_art, card_type, card_set, card_text, card_flavour_text, card_collector_info) {
    let card = create_element('div', 'card');

    let colour_info;

    for (let i in colours) {
        for (let j in card_cost) {
            let temp = colours[i];

            if (colours[i].code === card_cost[j]) {
                card.style.setProperty('--pinlines', temp.pinlines);
                card.style.setProperty('--bars', temp.bars);
                card.style.setProperty('--boxes', temp.boxes);

                colour_info = temp;

                break;
            }
        }
    }

    let background = create_element('img', 'background', '', card);
    background.setAttribute('src', 'dirt.jpg');
    background.style.filter = 'hue-rotate(' + colour_info.hue + 'deg) saturate(' + colour_info.saturation + '%) brightness(' + colour_info.brightness + '%)';

    let foreground = create_element('div', 'foreground', '', card);
    let name = create_element('div', 'name', '<p>' + card_name + '</p><p>' + card_cost + '</p>', foreground);

    let art = create_element('img', 'art', '', foreground);
    art.setAttribute('src', 'images/' + card_art);

    let typeline = create_element('div', 'typeline', '<p>' + card_type + '</p><p>' + card_set + '</p>', foreground);
    let textbox = create_element('div', 'textbox', '<p>' + card_text + '</p><p><em>' + card_flavour_text + '</em></p>', foreground);

    let collector_info = create_element('div', 'collector_info',
        '<div style="width: 100%; display: flex; justify-content: space-between">' +
        '<p>' + card_collector_info[0] + '</p>' +
        '<p>™ & © ' + card_collector_info[1] + ' Wizards of the Coast</p>' +
        '</div>' +
        '<p>' + card_collector_info[2] + ' 🖌 <strong>' + card_collector_info[3] + '</strong></p>', foreground);
}

function create_element(tag, class_name, text = '', parent = null) {
    let elem = document.createElement(tag);
    elem.setAttribute('class', class_name);

    elem.innerHTML = text;

    if (parent === null) document.body.appendChild(elem);
    else parent.appendChild(elem);

    return elem;
}