async function getCard(name) {
    return fetch('https://api.scryfall.com/cards/search?q=!"' + name + '"')
        .then(response => response.json());
}

async function getCardImage(name) {
    return getCard(name).then(data => data.data[0].image_uris.large);
}

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};

function createElement(tag, parent, class_name = '', inner = '') {
    let temp = document.createElement(tag);
    if (class_name !== '') temp.setAttribute('class', class_name);
    temp.innerHTML = inner;

    if (parent !== null) parent.appendChild(temp);

    return temp;
}

function createImage(parent, url) {
    let temp = createElement('img', parent);
    temp.setAttribute('src', url);
}

async function getDecklist() {
    return fetch('decklist.txt')
        .then((res) => res.text())
        .then((text) => {
            let lines = text.split('\n');
            let decklist = [];

            for (let i = 0; i < lines.length; i++) {
                let count = lines[i].split(' ')[0];
                decklist.push([ parseInt(count), lines[i].substring(count.length).trim() ]);
            }

            return decklist;
        })
        .catch((e) => console.error(e));
}