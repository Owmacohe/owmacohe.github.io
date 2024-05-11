window.onload = function () {
    let url = 'https://api.scryfall.com/cards/uma/172';

    fetch(url)
        .then((response) => {
            console.log(response.json());
        })
};