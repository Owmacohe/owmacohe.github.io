let sectionTitle;
let title;
let description;
let answerTitle;
let answer;
let search;

let reloadButton;
let answerButton;

let lists = [];
let data;

let section = 0;

window.onload = () => {
    readJsonFile('portugues.json').then(data => {
        lists[0] = ["Queue cards", data.queueCards];
        lists[1] = ["Useful phrases", data.usefulPhrases];
        lists[2] = ["Verbs", data.verbs];
        lists[3] = ["Dictionary", data.dictionary];

        sectionTitle = document.getElementById('sectionTitle');
        title = document.getElementById('title');
        description = document.getElementById('description');
        answerTitle = document.getElementById('answerTitle');
        answer = document.getElementById('answer');
        search = document.getElementById('search');

        reloadButton = document.getElementById('reloadButton');
        answerButton = document.getElementById('answerButton');

        search.addEventListener('input', searchDictionary);

        reload();
    });
};

function reload(newSection = -1) {
    if (newSection >= 0) section = newSection;

    let list = lists[section][1];

    if (list === undefined) return null;

    if (list.length === 0) window.location.reload();
    else {
        let index = Math.floor(Math.random() * list.length);
        let selected = list[index];
        let swap = Math.floor(Math.random() * 2) === 0;

        sectionTitle.innerHTML = lists[section][0];

        setData(getSelectedData(selected, swap));
        list.splice(index, 1);
    }
}

function setData(data) {
    this.data = data;

    title.innerHTML = data === null ? "..." : data.title;
    description.innerHTML = data === null ? "..." : data.description;

    var answerHidden = '';

    for (let i in data.answer.split('\n'))
        answerHidden += '...\n';

    answerTitle.style.display = section === 0 || section === 2 ? 'flex' : 'none';
    description.style.display = section === 0 || section === 2 ? 'flex' : 'none';

    answer.innerHTML = answerHidden;
    answer.style.columnCount = section === 2 ? '3' : 'auto';

    answerButton.style.display = 'flex';

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
    answer.innerHTML = this.data.answer;
    answerButton.style.display = 'none';
}

function searchDictionary(event) {
    if (section !== 3) return;

    let name = search.value.toLowerCase();

    if (name === "") return;

    let dictionary = lists[3][1];

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
