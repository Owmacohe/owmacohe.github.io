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