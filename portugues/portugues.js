let title;
let description;
let answer;

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

        reload();
    });
};

function reload(newSection = -1) {
    if (newSection >= 0) section = newSection;

    data = checkReload();

    title.innerHTML = data === null ? "..." : data.title;
    description.innerHTML = data === null ? "..." : data.description;
    answer.innerHTML = '...';
}

function checkReload() {
    let list = lists[section];

    if (list === undefined) return null;

    let selected = list[Math.floor(Math.random() * list.length)];

    if (selected === undefined) return null;

    let swap = Math.floor(Math.random() * 2) === 0;

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
            "title": swap ? selected.word : selected.phrase,
            "description": "",
            "answer": swap ? selected.phrase : selected.word
        };

        default: return null;
    }
}

function showAnswer() {
    answer.innerHTML = data === null ? "..." : data.answer;
}
