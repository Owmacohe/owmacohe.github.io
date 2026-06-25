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

function listToText(list) {
    let text = '';

    for (let i = 0; i < list.length; i++) {
        if (i > 0) text += '\n';
        text += list[i];
    }

    return text;
}

function verbToText(verb) {
    let text = '';

    for (let i = 0; i < 6; i++) {
        if (i > 0) text += '\n';

        switch (i) {
            case 0: text += verb.first;  break;
            case 1: text += verb.second; break;
            case 2: text += verb.third;  break;
            case 3: text += verb.fourth; break;
            case 4: text += verb.fifth;  break;
            case 5: text += verb.sixth;  break;
        }
    }

    return text;
}