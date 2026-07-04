let title;
let description;
let answer;
let search;

let lists = [];
let data;

let section = 0;

window.onload = () => {
    readJsonFile('portugues.json').then(data => {
        lists[0] = data.queueCards;
        lists[1] = data.usefulPhrases;
        lists[2] = data.verbs;
        lists[3] = data.dictionary;

        title = document.getElementById('title');
        description = document.getElementById('description');
        answer = document.getElementById('answer');
        search = document.getElementById('search');

        search.addEventListener('input', searchDictionary);

        reload();
    });
};

function reload(newSection = -1) {
    if (newSection >= 0) section = newSection;

    let list = lists[section];

    if (list === undefined) return null;

    let selected = list[Math.floor(Math.random() * list.length)];
    let swap = Math.floor(Math.random() * 2) === 0;

    setData(getSelectedData(selected, swap));
}

function setData(data) {
    this.data = data;

    title.innerHTML = data === null ? "..." : data.title;
    description.innerHTML = data === null ? "..." : data.description;
    answer.innerHTML = '...';

    search.style.display = section === 3 ? "flex" : "none";
}

function getSelectedData(selected, swap = false) {
    if (selected === undefined) return null;

    switch (section) {
        case 0: return {
            "title": selected.name,
            "description": listToText(selected.description),
            "answer": listToText(selected.answer)
        };

        case 1: return {
            "title": swap ? selected.answer : selected.phrase,
            "description": "",
            "answer": swap ? selected.phrase : selected.answer
        };

        case 2: return {
            "title": "Conjugate",
            "description": selected.name,
            "answer":
                "Past\n\n" + verbToText(selected.past) +
                "\nPresent\n\n" + verbToText(selected.present) +
                "\nFuture\n\n" + verbToText(selected.future)
        };

        case 3: return {
            "title": swap ? selected.word : selected.answer,
            "description": "",
            "answer": swap ? selected.answer : selected.word
        };

        default: return null;
    }
}

function showAnswer() {
    answer.innerHTML = this.data === null ? "..." : this.data.answer;
}

function searchDictionary(event) {
    if (section !== 3) return;

    let name = search.value.toLowerCase();

    if (name === "") return;

    let dictionary = lists[3];

    for (let i = 0; i < dictionary.length; i++) {
        if (dictionary[i].word.toLowerCase().includes(name) || dictionary[i].answer.toLowerCase().includes(name)) {
            setData({
                "title": dictionary[i].word,
                "description": "",
                "answer": dictionary[i].answer
            });

            answer.innerHTML = dictionary[i].answer;
            break;
        }
    }
}
