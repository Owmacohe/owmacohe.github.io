let private = false;

window.onload = function() {
    reset_search();

    file_list.forEach(set_tags);
    //file_list.forEach(add_to_list);

    setTimeout(function() {
        set_current_article("Introduction", false);
    }, 2000);
}

let list_contents = [];

function add_to_list(file_name) {
    if (!list_contents.includes(file_name)) {
        let item = document.createElement('button');
        item.setAttribute('onclick', 'set_current_article(this)');

        item.innerHTML = file_name;

        document.getElementById('list').appendChild(item);

        list_contents.push(file_name);

        if (list_contents.length > 5) {
            clear_first_list_item();
            list_contents.splice(0, 1);
        }
    }
}

function set_current_article(button, is_button = true) {
    let file_name = is_button ? (button.id === '' ? button.innerHTML : button.id) : button;

    let is_tag_private = false;

    if (!private)
        for (let i = 0; i < private_tags.length; i++)
            if (tags[get_tag_index(private_tags[i]) + 1].includes(file_name))
                is_tag_private = true;

    if (private || !is_tag_private) {
        clear_articles();
        add_to_list(file_name);
        get_text(file_name);
    }
}

function get_text(file_name) {
    fetch('articles/' + file_name + '.md')
        .then((res) => res.text())
        .then((text) => {
            process_text(text, file_name);
        });
}

function process_text(text, title) {
    if (text === '<!doctype html><title>404 Not Found</title><h1 style="text-align: center">404 Not Found</h1>')
        return;

    let article = document.createElement('div');
    article.setAttribute('class', 'flexcolumn article');
    document.getElementById('current_article').appendChild(article);

    let top_bar = document.createElement('div');
    top_bar.setAttribute('class', 'flexrow topbar');
    article.appendChild(top_bar);

    let article_tags = document.createElement('div');
    article_tags.setAttribute('class', 'flexrow tags');
    top_bar.appendChild(article_tags);

    article_tags.innerHTML += '<h3>Tags:</h3>';

    let lst = get_list_from_tag(title);
    let description = document.createElement('div');

    let associated_parent = null;
    let associated = null;

    if (lst.length > 0) {
        associated_parent = document.createElement('div');
        associated_parent.setAttribute('class', 'flexcolumn associated_parent');
        article.appendChild(associated_parent);

        associated = document.createElement('div');
        associated.setAttribute('class', 'flexrow associated');
        associated.setAttribute('style', 'justify-content: end; align-items: center; flex-wrap: wrap;');
        associated_parent.appendChild(associated);

        associated.innerHTML = 'Associated:' + lst;

        description.style.maxHeight = '350px';
    }

    description.setAttribute('class', 'description');
    article.appendChild(description);

    let split = text.split('\n');

    let line_text = '';
    let is_list = false;

    for (let i = 0; i < split.length; i++) {
        if (i >= 4 && is_text_empty(text)) break;

        let add_new_line = true;

        if (split[i] !== '') {
            if (!is_list) line_text = '';

            let header_count = 0;
            let done_counting = false;

            let add_line = true;

            if (split[i][0] === '-' && split[i].length > 2 && split[i][1] === ' ') {
                if (!is_list) {
                    line_text += '<ul>';
                    is_list = true;
                }
                else {
                    line_text += '</li>';
                }

                line_text += '<li>';

                add_new_line = false;
            }
            else {
                if (is_list) {
                    line_text += '</li></ul><br>';
                    is_list = false;

                    description.innerHTML += line_text;
                    line_text = '';
                }
            }

            for (let j = 0; j < split[i].length; j++) {
                if (!done_counting) {
                    if (split[i][j] === '#') header_count++;
                    else done_counting = true;
                }

                if (done_counting) {
                    if (split[i][j] === '[' && find_next_index_of(split[i], j, ']') >= 0) {
                        let next_close = find_next_index_of(split[i], j, ']');
                        let close = split[i].substring(j + 1, next_close);

                        if (split[i].length > next_close + 1 &&
                            split[i][next_close + 1] === '(' &&
                            find_next_index_of(split[i], next_close, ')') >= 0) {

                            line_text += '<a href="' +
                                split[i].substring(next_close + 2, find_next_index_of(split[i], next_close, ')')) +
                                '" target="_blank" rel="noopener noreferrer">' + close + '</a>';

                            j = find_next_index_of(split[i], next_close, ')');

                            if (j === split[i].length - 3) line_text += '<br>';
                        }
                        else {
                            let close_split = close.split('|');
                            let id = '';

                            if (close_split.length === 2) id = ' id="' + close_split[1] + '"';

                            line_text += '<button onclick="set_current_article(this)"' + id + '>' + close_split[0] + '</button>';

                            j = next_close;

                            if (j === split[i].length - 1) line_text += '<br>';
                        }

                        add_new_line = false;
                    }
                    else if (i === 2 && split[i][j] === '{' && find_next_index_of(split[i], j, '}') >= 0) {
                        add_line = false;
                        let tagsList = split[i].substring(j+1, find_next_index_of(split[i], j, '}')).split(',');

                        if (tagsList[0] !== '') {
                            for (let k = 0; k < tagsList.length; k++) {
                                article_tags.innerHTML += '<button onclick="set_current_article(this)">' + tagsList[k] + '</button>';
                            }
                        }
                        else {
                            article_tags.remove();
                        }
                    }
                    else if (split[i][j] === '*' && find_next_index_of(split[i], j, '*') >= 0) {
                        let star_count = 0;

                        while (split[i][j] === '*') {
                            star_count++;
                            j++;
                        }

                        j--;

                        switch (star_count) {
                            case 1:
                                line_text += '<i>';
                                break;
                            case 2:
                                line_text += '<b>';
                                break;
                            case 3:
                                line_text += '<i><b>';
                                break;
                        }
                    }
                    else if (split[i][j] === '*' && find_previous_index_of(split[i], j, '*') >= 0) {
                        let star_count = 0;

                        while (split[i][j] === '*') {
                            star_count++;
                            j++;
                        }

                        j--;

                        switch (star_count) {
                            case 1:
                                line_text += '</i>';
                                break;
                            case 2:
                                line_text += '</b>';
                                break;
                            case 3:
                                line_text += '</b></i>';
                                break;
                        }
                    }
                    else if (split[i][j] === '^' && find_next_index_of(split[i], j, '^') >= 0) {
                        let img = document.createElement('img');
                        img.setAttribute('src', split[i].substring(1, split[i].length - 1));
                        description.appendChild(img);

                        j = find_next_index_of(split[i], j, '^');
                        add_line = false;
                    }
                    else if (split[i][j] === '%' && find_next_index_of(split[i], j, '%') >= 0) {
                        description.innerHTML += get_list_from_tags(
                            split[i].substring(1, split[i].length - 1).split('|'));

                        j = find_next_index_of(split[i], j, '%');

                        add_line = false;
                        add_new_line = false;
                    }
                    else if (split[i][j] === '-' && j+1 < split[i].length && split[i][j+1] === ' ') { j++; }
                    else if (split[i][j] === '"' && j+1 < split[i].length && split[i][j+1] === '"') { }
                    else if (split[i][j] === '.' && j+1 < split[i].length && split[i][j+1] === split[i][j+1].toUpperCase()) {
                        line_text += '. ';
                    }
                    else {
                        line_text += split[i][j];
                    }
                }
            }

            if (add_line && !is_list) {
                let type = '';
                let normal_text = true;

                if (header_count > 0) {
                    type = 'h' + header_count;

                    normal_text = false;
                }
                else if (split[i] === '---') {
                    type = 'hr';
                    line_text = '';

                    normal_text = false;
                }

                if (normal_text) {
                    description.innerHTML += line_text;
                }
                else {
                    let line = document.createElement(type);
                    line.innerHTML = line_text;

                    if (header_count === 1) {
                        top_bar.insertBefore(line, top_bar.firstChild);
                    }
                    else {
                        description.appendChild(line);
                        add_new_line = false;
                    }
                }
            }
        }

        if (i >= 4 && add_new_line) {
            if (description.innerHTML[description.innerHTML.length - 1] !== '>')
                description.innerHTML += '<br>';

            description.innerHTML += '<br>';
        }
    }

    /*
    if (description.innerText.length <= 800) {
        description.style.columnCount = '1';
        description.style.maxHeight = '500px';
    }
    */

    if (is_list) description.innerHTML += line_text;

    setTimeout(() => {
        add_scroll_reminder(article, description);
        if (lst.length > 0) add_scroll_reminder(associated_parent, associated);
    }, 1000);
}

function add_scroll_reminder(parent, checking) {
    if (checking.scrollHeight > checking.clientHeight) {
        let overflow_reminder = document.createElement('div');
        overflow_reminder.setAttribute('id', 'overflow');
        parent.appendChild(overflow_reminder);

        overflow_reminder.innerHTML = '⇣ scroll for more ⇣';
    }
}