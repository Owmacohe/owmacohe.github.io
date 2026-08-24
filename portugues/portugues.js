let sectionTitle;
let title;
let description;
let arrow;
let answerTitle;
let answer;
let answerColumn;
let search;

let reloadButton;
let answerButton;
let allButton;

let lists = [];
let data;

let section = 0;
let answerIndex = 0;

let pt = ' <i class="lang">(PT)</i>';
let en = ' <i class="lang">(EN)</i>';

window.onload = () => {
    readJsonFile('portugues.json').then(data => {
        lists[0] = ["Queue cards", data.queueCards];
        lists[1] = ["Useful phrases", data.usefulPhrases];
        lists[2] = ["Verbs", data.verbs];
        lists[3] = ["Dictionary", data.dictionary];

        sectionTitle = document.getElementById('sectionTitle');
        title = document.getElementById('title');
        description = document.getElementById('description');
        arrow = document.getElementById('arrow');
        answerTitle = document.getElementById('answerTitle');
        answer = document.getElementById('answer');
        answerColumn = document.getElementById('answerColumn');
        search = document.getElementById('search');

        reloadButton = document.getElementById('reloadButton');
        answerButton = document.getElementById('answerButton');
        allButton = document.getElementById('allButton');

        search.addEventListener('input', searchDictionary);

        reload();
    });
};

function reload(newSection = -1) {
    if (newSection >= 0) section = newSection;

    let list = lists[section][1];
    answerIndex = 0;

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

    answerTitle.style.display = section === 0 ? 'flex' : 'none';
    description.style.display = section === 0 || section === 2 ? 'flex' : 'none';

    arrow.style.display = section === 2 ? 'none' : 'flex';
    answerColumn.style.display = section === 2 ? 'none' : 'flex';

    if (section === 2) {
        answerButton.style.display = 'none';
        allButton.style.display = 'none';
        return;
    }

    var answerHidden = '';

    for (let i in data.answer.split('\n'))
        answerHidden += '...\n';

    answer.innerHTML = answerHidden;

    answerButton.style.display = 'flex';
    allButton.style.display = data.answer.includes('\n') ? 'flex' : 'none';

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
            "title": swap ? selected.answer + en : selected.phrase + pt,
            "description": "",
            "answer": swap ? selected.phrase + pt : selected.answer + en
        };

        case 2: return {
            "title": "Conjugate\n(presente, pretérito, futuro)",
            "description": "<a href='https://conjugator.reverso.net/conjugation-portuguese-verb-"+selected+".html' target='_blank' rel='noopener noreferrer'>"+selected+"</a>"
        };

        case 3: return {
            "title": swap ? selected.word.toLowerCase() + pt : selected.answer.toLowerCase() + en ,
            "description": "",
            "answer": swap ? selected.answer.toLowerCase() + en : selected.word.toLowerCase() + pt
        };

        default: return null;
    }
}

function showAnswer(all) {
    if (all) {
        answer.innerHTML = this.data.answer;
        answerButton.style.display = 'none';
        allButton.style.display = 'none';

        answerIndex = 99;
    }
    else {
        let answerList = this.data.answer.split('\n');
        let answerText = '';

        for (let i = 0; i < answerList.length; i++) {
            if (i <= answerIndex) answerText += answerList[i];
            else answerText += '...';

            answerText += '\n';
        }

        answer.innerHTML = answerText;

        answerIndex++;

        if (answerIndex >= answerList.length) {
            answerButton.style.display = 'none';
            allButton.style.display = 'none';
        }
    }
}

function searchDictionary(event) {
    if (section !== 3) return;

    let name = search.value.toLowerCase();

    if (name === "") return;

    let dictionary = lists[3][1];

    for (let i = 0; i < dictionary.length; i++) {
        if (dictionary[i].word.toLowerCase().includes(name) || dictionary[i].answer.toLowerCase().includes(name)) {
            setData({
                "title": dictionary[i].word + pt,
                "description": "",
                "answer": dictionary[i].answer + en
            });

            answer.innerHTML = dictionary[i].answer + en;
            break;
        }
    }
}
