let file_list = []; // The list of all names of articles
let is_wiki_private = false; // Whether this wiki is in private mode
let default_article = ''; // The article to load by default
let loaded = false; // Variable to let other scripts know that the initial page has been loaded

window.onload = function() {
    reset_search();
    setup();

    // Setting the list of tags (see tags.js) (after waiting for the setup)
    setTimeout(function() {
        file_list.forEach(set_tags);
    }, 2000);

    // Making sure to wait for the tag loading to be done
    setTimeout(function() {
        // Setting the wiki stats
        document.getElementById('creator').innerText +=
            ' (' + file_list.length + ' articles, ' + tags[0].length + ' tags)';

        document.getElementById('loading').remove(); // Removing the loading message

        go_home();

        loaded = true;
    }, 4000);
}

/// Resets the article to the splash page
function go_home() { set_current_article(default_article, false); }

/// Gets data from the settings and registry files to initialize variables
function setup() {
    fetch('settings.txt')
        .then((res) => res.text())
        .then((text) => {
            let split = text.split('\n');
            let title = split[0].split(':')[1];

            // Setting the wiki title
            document.title = title;
            document.getElementById('title').innerText = title;

            // Setting the creator name, dates of creation, and public/private status
            document.getElementById('creator').innerText =
                split[1].split(':')[1] + ', ' + split[2].split(':')[1] +
                ' (' + ((split[4].split(':')[1] === 'true') ? 'private' : 'public') + ' version)';

            // Initializing various other variables
            default_article = split[3].split(':')[1];
            is_wiki_private = split[4].split(':')[1] === 'true';
            private_tags = split[5].split(':')[1].split(',');
        });

    // Setting the file list
    fetch('registry.txt')
        .then((res) => res.text())
        .then((text) => {
            file_list = text.split('\n');
        });
}

let list_contents = []; // The list of most recently visited articles

/// Adds an article to the list of most recently visited ones
function add_to_list(file_name) {
    // Making sure to exclude ones already in the list
    if (!list_contents.includes(file_name)) {
        // Creating a new button
        let item = document.createElement('button');
        item.setAttribute('onclick', 'set_current_article(this)');
        document.getElementById('list').appendChild(item);

        item.innerText = file_name; // Setting the button text

        list_contents.push(file_name); // Adding it to the checking list

        // Making sure to remove the oldest article in the list
        if (list_contents.length > 5) {
            document.getElementById('list').children[1].remove();
            list_contents.splice(0, 1);
        }
    }
}

/// Sets the current article of the wiki
// (is_button = whether this method is being called from an HTML button)
function set_current_article(button, is_button = true) {
    // Getting the name of the article to set
    let file_name = is_button ? (button.id === '' ? button.innerHTML : button.id) : button;

    if (!is_tag_private(file_name)) {
        // Clearing the current article
        let temp = document.getElementById('current_article').children;
        if (temp.length > 0) temp[0].remove();

        add_to_list(file_name); // Adding the new article to the recent list
        get_text(file_name); // Starting the process of parsing the article
    }
}

/// Intermediary function to get the content of the article and pass it along to the parsing function
function get_text(file_name) {
    fetch('articles/' + file_name + '.md')
        .then((res) => res.text())
        .then((text) => {
            process_text(text, file_name);
        });
}

let description = null; // The description element of the article
let description_html = '';

/// Creates a new article, setting its fields and such
function process_text(text, title) {
    // Returning if the article can't be found
    if (text === '<!doctype html><title>404 Not Found</title><h1 style="text-align: center">404 Not Found</h1>')
        return;

    // Creating the article parent
    let article = document.createElement('div');
    article.setAttribute('class', 'flexcolumn article');
    document.getElementById('current_article').appendChild(article);

    // Creating the top bar which houses the article's tags
    let top_bar = document.createElement('div');
    top_bar.setAttribute('class', 'flexrow topbar');
    article.appendChild(top_bar);

    // Creating the tags parent
    let article_tags = document.createElement('div');
    article_tags.setAttribute('class', 'flexrow tags');
    top_bar.appendChild(article_tags);

    // Creating the description element
    description = document.createElement('div');
    description.setAttribute('class', 'description');

    // Initializing the 'associated' elements
    let associated_parent = null;
    let associated = null;

    // Getting an HTML-formatted list of all the associated articles for the current article
    let lst = get_list_from_tag(title);

    if (lst.length > 0) {
        // Creating the parent of the associated list
        associated_parent = document.createElement('div');
        associated_parent.setAttribute('class', 'flexcolumn associated_parent');
        article.appendChild(associated_parent);

        associated_parent.innerHTML = '<h3>Associated (' + get_tagged_length(title) + '):</h3>';

        // Creating the associated element
        associated = document.createElement('div');
        associated.setAttribute('class', 'flexrow associated');
        associated.setAttribute('style', 'justify-content: end; align-items: center; flex-wrap: wrap;');
        associated_parent.appendChild(associated);

        associated.innerHTML = lst; // Putting the previously created list inside of it
    }

    article.appendChild(description);
    description_html = '';

    let split = text.split('\n');

    for (let i = 0; i < split.length; i++) {
        if (i >= 4) {
            if (is_text_empty(text)) break;
            else check_and_add(split[i], i === split.length - 1);
        }
        else if (i === 2) {
            let tagsList = split[i].substring(1, find_next_index_of(split[i], 0, '}')).split(',');

            article_tags.innerHTML += '<h3>Tags (' + tagsList.length + '):</h3>';

            if (tagsList[0] !== '') {
                for (let j = 0; j < tagsList.length; j++) {
                    let is_tag_private = false;

                    if (!is_wiki_private)
                        for (let k = 0; k < private_tags.length; k++)
                            if (tags[get_tag_index(private_tags[k]) + 1].includes(tagsList[j]) ||
                                private_tags[k] === tagsList[j])
                                is_tag_private = true;

                    if (is_wiki_private || !is_tag_private)
                        article_tags.innerHTML += '<button onclick="set_current_article(this)">' + tagsList[j] + '</button>';
                }
            }
            else {
                article_tags.remove();
            }
        }
        else if (i === 0) {
            let title = document.createElement('h1');
            title.innerHTML = split[i].substring(2);

            top_bar.insertBefore(title, top_bar.firstChild);
        }
    }

    reset();

    if (text.length >= 1000)
        description.style.columnCount = '2';

    description.innerHTML +=
        '<div class="flexrow" id="character_count">' +
        description.innerText.length + ' characters</div>';

    setTimeout(() => {
        add_scroll_reminder(article, description);
        if (lst.length > 0) add_scroll_reminder(associated_parent, associated);
    }, 1000);
}

let list_level = 0;
let list_order = '';
let is_quote = false;

function check_and_add(line, is_last) {
    let ignore_break = false;

    if (list_level === 0 && !is_quote) description_html = '';

    if (line !== '') {
        // Title
        // Tags

        // Horizontal Rule
        // Quote
        // List (manual) (ordered & unordered)
        // Header
        // Image
        // List (automatic)
        // Bold/Italic
        // Strikethrough
        // Button
        // Link

        if (line === '---') {
            description_html += '<hr>';
            ignore_break = true;
        }
        else {
            let i = 0;

            if (line.substring(0, 2) === '> ') {
                i = 2;

                if (!is_quote) {
                    description_html += '<div class="quote">';
                    is_quote = true;
                }
            }
            else if (line[0] === '>' && is_quote)
                i = 1;
            else {
                if (!is_last && is_quote) {
                    description_html += '</div>';
                    is_quote = false;
                }
            }

            let current_list_level = 0;
            let is_current_ordered = false;
            let indent_count = 0;

            for (let j = 0; j < line.length; j++) {
                if (line[j] === ' ') indent_count++;
                else {
                    let indicator = line.substring(j, j+2);
                    let is_ordered = (indicator[0] >= 0 && indicator[0] <= 9 && indicator[1] === '.');

                    is_current_ordered = is_ordered;

                    if ((j === 0 || indent_count > 0) && (indicator === '- ' || is_ordered)) {
                        current_list_level = (indent_count / 3) + 1;
                        i = indent_count + 2;
                    }

                    break;
                }
            }

            if (list_level < current_list_level) {
                for (let k = 0; k < current_list_level - list_level - 1; k++) {
                    description_html += '<ul>';
                    list_order += '0';
                }

                description_html += is_current_ordered ? '<ol>' : '<ul>';
                list_order += is_current_ordered ? '1' : '0';
            }
            else if (list_level > current_list_level) {
                for (let k = 0; k < list_level - current_list_level; k++) {
                    description_html += (list_order[list_order.length - 1] === '1') ? '</ol>' : '</ul>';
                    list_order = list_order.substring(0, list_order.length - 1);
                }
            }

            list_level = current_list_level;

            if (list_level > 0) description_html += '<li>';

            let header_level = 0;

            if (line[0] === '#') {
                for (let header_index = 0; header_index < line.length; header_index++) {
                    if (line[header_index] === '#') header_level++;
                    else break;
                }

                description_html += '<h' + header_level + '>';
            }

            if (is_special_item(line, '^'))
                description_html += '<img src="' + line.substring(1, line.length - 1) + '">';
            else if (is_special_item(line, '%')) {
                description_html += get_list_from_tags(line.substring(1, line.length - 1).split('|'));
                ignore_break = true;
            }
            else {
                let bold_italic_level = 0;
                let highest_level = 0;
                let is_bold_italic = false;

                let is_strikethrough = false;

                let is_button = false;
                let is_link = false;

                while (i < line.length) {
                    if (line.substring(i, i+2) === '""') { /* skip one quotation */ }
                    else if (line[i] === '*') {
                        bold_italic_level += is_bold_italic ? -1 : 1;

                        if (bold_italic_level > highest_level)
                            highest_level = bold_italic_level;

                        if (bold_italic_level > 0 && line[i+1] !== '*') {
                            is_bold_italic = true;

                            switch (bold_italic_level) {
                                case 1:
                                    description_html += '<i>';
                                    break;
                                case 2:
                                    description_html += '<b>';
                                    break;
                                case 2:
                                    description_html += '<b><i>';
                                    break;
                            }
                        }

                        if (bold_italic_level <= 0 && is_bold_italic) {
                            is_bold_italic = false;

                            switch (highest_level) {
                                case 1:
                                    description_html += '</i>';
                                    break;
                                case 2:
                                    description_html += '</b>';
                                    break;
                                case 2:
                                    description_html += '</b></i>';
                                    break;
                            }

                            highest_level = 0;
                        }
                    }
                    else if (line.substring(i, i+2) === '~~') {
                        i++;

                        description_html += is_strikethrough ? '</s>' : '<s>';
                    }
                    else if (line[i] === '[') {
                        let next_index = find_next_index_of(line, i, ']');
                        let inner = line.substring(i+1, next_index);

                        if (line[next_index + 1] !== '(') {
                            is_button = true;

                            let inner_split = inner.split('|');

                            description_html +=
                                '<button onclick="set_current_article(this)" id="' +
                                inner_split[inner_split.length > 1 ? 1 : 0] + '">' +
                                inner_split[0];
                        }
                        else {
                            is_link = true;

                            description_html +=
                                '<a href="' +
                                line.substring(next_index + 2, find_next_index_of(line, i, ')')) +
                                '" target="_blank" rel="noopener noreferrer">';
                        }
                    }
                    else if (line[i] === ']' && is_button) {
                        description_html += '</button>';

                        is_button = false;
                    }
                    else if (line[i] === ']' && is_link) { }
                    else if (line[i] === '(' && is_link) {
                        i = find_next_index_of(line, i, ')') - 1;
                    }
                    else if (line[i] === ')' && is_link) {
                        description_html += '</a>';

                        is_link = false;
                    }
                    else {
                        if (i >= header_level && !is_button) description_html += line[i];
                    }

                    i++;
                }
            }

            if (header_level > 0) description_html += '</h' + header_level + '>';
            if (header_level > 0) ignore_break = true;

            if (list_level > 0) description_html += '</li>';

            if (is_quote) {
                if (is_last) {
                    description_html += '</div>';
                    is_quote = false;
                }
                else {
                    description_html += '<br>';
                }
            }
        }
    }
    else {
        reset();
    }

    if ((list_level === 0 || is_last) && !is_quote)
        description.innerHTML += description_html + (ignore_break ? '' : '<br>');
}

function reset() {
    list_level = 0;
    list_order = '';

    description_html += '</div>';
    is_quote = false;
}

function is_special_item(line, character) {
    return line[0] === character && find_next_index_of(line, 0, character) >= 0;
}

function add_scroll_reminder(parent, checking) {
    if (checking.scrollHeight > checking.clientHeight) {
        let overflow_reminder = document.createElement('div');
        overflow_reminder.setAttribute('id', 'overflow');
        parent.appendChild(overflow_reminder);

        overflow_reminder.innerHTML = '⇣ scroll for more ⇣';
    }
}