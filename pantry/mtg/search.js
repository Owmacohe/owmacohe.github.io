let input;
let preview;

window.onload = function () {
    input = document.getElementById('search');
    preview = document.getElementById('preview');

    clear();
}

function clear() {
    input.value = '';
}

function search(key) {
    if (key === 13) {
        for (let i in names) {
            if (format(names[i]).includes(format(input.value))) {
                set_preview(names[i]);
                clear();
                break;
            }
        }
    }
}

function format(name) {
    let remove = '\'—,()/\\’';

    for (let i in remove)
        name = name.replaceAll(remove[i], '');

    return name.toLowerCase();
}

function random() {
    set_preview(names[Math.floor(Math.random() * names.length)]);
}

function set_preview(name) {
    preview.setAttribute('src', 'images/' + format(name) + '.png');
}