function find_next_index_of(line, current_index, symbol) {
    for (let i = current_index + 1; i < line.length; i++) {
        if (line[i] === symbol) return i;
    }

    return -1;
}

function find_previous_index_of(line, current_index, symbol) {
    for (let i = current_index - 1; i > -1; i--) {
        if (line[i] === symbol) return i;
    }

    return -1;
}

function download(filename, text) {
    //Create the hidden anchor
    var hiddenAnchor = document.createElement('a');
    hiddenAnchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    hiddenAnchor.setAttribute('download', filename);
    hiddenAnchor.style.display = 'none';
    document.body.appendChild(hiddenAnchor);

    //Click it, then remove it
    hiddenAnchor.click();
    document.body.removeChild(hiddenAnchor);
}

function reset_search() {
    document.getElementById('search').children[1].value = '';
}

function get_search(name) {
    let is_whitespace = true;

    for (let whitespace_index = 0; whitespace_index < name.length; whitespace_index++) {
        if (name[whitespace_index] !== ' ') {
            is_whitespace = false;
            break;
        }
    }

    if (is_whitespace) return null;

    for (let i = 0; i < file_list.length; i++) {
        if (file_list[i].toLowerCase().includes(name.toLowerCase())) {
            let is_tag_private = false;

            if (!is_wiki_private)
                for (let j = 0; j < private_tags.length; j++)
                    if (tags[get_tag_index(private_tags[j]) + 1].includes(file_list[i]) ||
                        private_tags[j] === file_list[i])
                        is_tag_private = true;

            if (is_wiki_private || !is_tag_private) {
                return file_list[i];
            }
        }
    }

    return null;
}

function search(event, input) {
    if (event.keyCode === 13 && loaded) {
        let name = get_search(input.value);

        if (name !== null) {
            set_current_article(name, false);
            reset_search();
        }
    }
}

function is_text_empty(text) {
    let split = text.split('\n');

    for (let i = 4; i < split.length; i++)
        if (split[i] !== '')
            return false;

    return true;
}

function is_tag_private(file_name) {
    if (!is_wiki_private)
        for (let i = 0; i < private_tags.length; i++)
            if (tags[get_tag_index(private_tags[i]) + 1].includes(file_name))
                return true;

    return false;
}