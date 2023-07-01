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

function clear_articles() {
    let article_children = document.getElementById('current_article').children;
    while (article_children.length > 0) article_children[0].remove();

    /*
    let list_children = document.getElementById('list').children;
    while (list_children.length > 1) list_children[1].remove();
    */
}

function clear_first_list_item() {
    let list_children = document.getElementById('list').children;
    list_children[1].remove();
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
    for (let i = 0; i < file_list.length; i++) {
        if (file_list[i].toLowerCase().includes(name.toLowerCase())) {
            let is_tag_private = false;

            if (!private)
                for (let j = 0; j < private_tags.length; j++)
                    if (tags[get_tag_index(private_tags[j]) + 1].includes(file_list[i]))
                        is_tag_private = true;

            if (private || !is_tag_private) {
                return file_list[i];
            }
        }
    }

    return null;
}

function search(event, input) {
    if (event.keyCode === 13) {
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