let queueCards;

let queueCardTitle;
let queueCardDescription;
let queueCardAnswer;

let queueCard;

window.onload = () => {
    readJsonFile('portugues.json').then(data => {
        queueCards = data.queueCards;
    });

    queueCardTitle = document.getElementById('queueCardTitle');
    queueCardDescription = document.getElementById('queueCardDescription');
    queueCardAnswer = document.getElementById('queueCardAnswer');
};

async function readJsonFile(filePath) {
    try {
        const response = await fetch(filePath)

        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.status}`)
        }

        const jsonData = await response.json()
        return jsonData
    } catch (error) {
        console.error('Error reading JSON file:', error)
        throw error
    }
}

function reload() {
    if (queueCards === undefined) return;

    queueCard = queueCards[Math.floor(Math.random() * queueCards.length)];

    if (queueCard === undefined) return;

    queueCardTitle.innerHTML = queueCard.name;
    queueCardDescription.innerHTML = listToText(queueCard.description);
    queueCardAnswer.innerHTML = '...';
}

function answer() {
    if (queueCard === undefined) return;

    queueCardAnswer.innerHTML = listToText(queueCard.answer);
}

function listToText(list) {
    let answers = '';

    for (let i = 0; i < list.length; i++) {
        if (i > 0) answers += '\n';
        answers += list[i];
    }

    return answers;
}
