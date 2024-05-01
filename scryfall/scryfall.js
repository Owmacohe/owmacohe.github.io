let cards;
let assignment_index;
let delay = 120;

window.onload = function () {
    cards = document.getElementsByClassName('card');
    assignCards();
}

function assignCards() {
    assignment_index = 0;
    assignNextCard();
}

async function assignNextCard() {
    if (assignment_index < cards.length) {
        if (cards[assignment_index].classList !== undefined && cards[assignment_index].classList.length > 1) {
            let url = await fetchImage(cards[assignment_index].classList.item(1));
            setImage(cards[assignment_index], url);
        }

        assignment_index++;

        setTimeout(assignNextCard, delay);
    }
}

async function createCard(name, class_name = '', parent = null) {
    return fetchImage(name).then(url => createImage(url, class_name, parent));
}

function createImage(src, class_name = '', parent = null) {
    let image = createElement('img', class_name, '', parent);
    setImage(image, src);

    return image;
}

async function fetchImage(name) {
    return fetch('https://api.scryfall.com/cards/search?q=' + name)
        .then(response => response.json())
        .then(data => data.data[0].image_uris.large);
}

function setImage(image, src) {
    image.setAttribute('src', src);

    return image;
}

function createElement(tag, class_name = '', inner = '', parent = null) {
    let temp = document.createElement(tag);
    if (class_name !== '') temp.setAttribute('class', class_name);
    temp.innerHTML = inner;

    if (parent !== null) parent.appendChild(temp);

    return temp;
}