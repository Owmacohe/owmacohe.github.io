// 0 = the name of each article
// 1...inf = the other articles that it's tagged with
let tags = [[]];

let private_tags = [
    '🔒 private',
    '🚧 todo'
];

function set_current_tag(tag) {
    clear_articles();

    tags[tags[0].indexOf(tag) + 1].forEach((t) => {
        //add_to_list(t);
        get_text(t);
    });
}

function get_tag_index(tag) {
    for (let i = 0; i < tags[0].length; i++)
        if (tags[0][i] === tag)
            return i;

    return -1;
}

function get_tagged_length(tag) {
    let index = get_tag_index(tag);
    return index >= 0 ? tags[index + 1].length : -1;
}

function get_list_from_tag(tag) {
    let columns = 1;
    let lists = [];

    for (let c = 0; c < columns; c++) lists.push('');

    let index = get_tag_index(tag);
    let len = get_tagged_length(tag);
    let list_index = 0;

    for (let i = 0; i < len; i++) {
        let is_tag_private = false;

        if (!private)
            for (let j = 0; j < private_tags.length; j++)
                if (tags[get_tag_index(private_tags[j]) + 1].includes(tags[index + 1][i]))
                    is_tag_private = true;

        if (private || !is_tag_private) {
            let item = '<button onclick="set_current_article(this)">' + tags[index + 1][i] + '</button>';

            if (i !== 0 && i % Math.round(len / columns) === 0) list_index++;

            lists[list_index] += item;
        }
    }

    let result = '';

    for (let k = 0; k < columns; k++)
        result += lists[k];

    return result;
}

function get_list_from_tags(tag_list) {
    let good = tag_list[0].split(',');
    let bad = (tag_list.length === 2) ? tag_list[1].split(',') : [];

    let valid_articles = [];
    let index = get_tag_index(good[0]);

    for (let i = 0; i < get_tagged_length(good[0]); i++)
        valid_articles.push(tags[index + 1][i]);

    for (let j = 0; j < valid_articles.length; j++) {
        let is_tag_private = false;

        if (!private)
            for (let prv = 0; prv < private_tags.length; prv++)
                if (tags[get_tag_index(private_tags[prv]) + 1].includes(valid_articles[j]))
                    is_tag_private = true;

        if (!private && is_tag_private) {
            valid_articles[j] = 'null';
        }
        else {
            for (let k = 1; k < good.length; k++) {
                index = get_tag_index(good[k]);

                if (index < 0 || !tags[index + 1].includes(valid_articles[j])) {
                    valid_articles[j] = 'null';
                    break;
                }
            }

            for (let l = 0; l < bad.length; l++) {
                index = get_tag_index(bad[l]);

                if (index >= 0 && tags[index + 1].includes(valid_articles[j])) {
                    valid_articles[j] = 'null';
                    break;
                }
            }
        }
    }

    let lst = '';

    for (let m = 0; m < valid_articles.length; m++)
        if (valid_articles[m] !== 'null')
            lst += '<li><button onclick="set_current_article(this)">' + valid_articles[m] + '</button></li>';

    return '<ul>' + lst + '</ul>';
}

function set_tags(file_name) {
    fetch('articles/' + file_name + '.md')
        .then((res) => res.text())
        .then((text) => {
            process_tags(file_name, text);
        });
}

function process_tags(file_name, text) {
    let split = text.split('\n');

    if (split.length > 1) {
        let line = split[2];
        let index = find_next_index_of(line, 0, '}');

        if (line[0] === '{' && index >= 0) {
            let tagsList = line.substring(1, index).split(',');

            for (let i = 0; i < tagsList.length; i++) {
                if (!tags[0].includes(tagsList[i])) {
                    tags[0].push(tagsList[i]);
                    tags.push([]);
                }

                tags[tags[0].indexOf(tagsList[i]) + 1].push(file_name);
            }
        }
    }
}