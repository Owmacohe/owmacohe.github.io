let csv = [];
let downloaded_file_list = [];

window.onload = function() {
    load_csv();

    setTimeout(function () {
        //download_range(0, 500);
        //download_registry_range(0, 500);
    }, 1000);
}

function download_individual(index) {
    download(csv[index][0] + '.md', '# ' + csv[index][0] + '\n\n{' + csv[index][2] + '}\n\n' + format(csv[index][1]));
}

function download_range(min, max) {
    for (let i = min; i < max+1; i++) {
        download_individual(i);
    }
}

function download_registry_range(min, max) {
    let temp = 'let file_list = [\n';

    for (let i = min; i < max+1; i++) {
        temp += '\t"' + downloaded_file_list[i] + '",\n';
    }

    temp += '];'

    download('registry.js', temp);
}

function load_csv() {
    fetch('tiddlers.csv')
        .then((res) => res.text())
        .then((text) => {
            set_csv(text);
        });
}

function set_csv(text) {
    let split = text.split('\n');
    let getting_text = false;
    let current_text = '';

    for (let i = 1; i < split.length; i++) {
        if (split[i].includes('"')) {
            let cells = split[i].split('","');

            if (!getting_text) {
                current_text = '';

                csv.push([]);
                csv[csv.length - 1].push(cells[0].substring(1));

                downloaded_file_list.push(csv[csv.length - 1][0]);

                getting_text = true;

                if (cells.length === 2) {
                    current_text += cells[1] + '\n';
                }
                else if (cells.length === 7) {
                    csv[csv.length - 1].push(remove_exterior(cells[1]));

                    csv[csv.length - 1].push(split_tag_list(cells[5]));

                    getting_text = false;
                }
            }
            else {
                cells = split[i].split('","');

                if (cells.length > 1) {
                    current_text += cells[0].substring(0, cells[0].length);
                    csv[csv.length - 1].push(current_text);

                    csv[csv.length - 1].push(split_tag_list(cells[4]));

                    getting_text = false;
                }
                else if (cells.length === 1) {
                    current_text += cells[0] + '\n';
                }
            }
        }
        else {
            current_text += split[i] + '\n';
        }
    }
}

function remove_exterior(cell, amount = 1) {
    return cell.substring(amount, cell.length - amount);
}

function split_tag_list(lst) {
    if (lst.includes(']]')) {
        if (lst.includes(']] ') || lst.includes(' [[')) {
            let split1 = lst.split(']] [[');
            let temp = [];

            for (let i = 0; i < split1.length; i++) {
                let split2 = split1[i].split(']] ');

                for (let j = 0; j < split2.length; j++) {
                    let split3 = split2[j].split(' [[');

                    for (let k = 0; k < split3.length; k++) {
                        temp.push(split3[k]);
                    }
                }
            }

            if (temp[0].substring(0, 2) === '[[') temp[0] = temp[0].substring(2);

            let last_index = temp.length - 1;
            if (temp[last_index].substring(temp[last_index].length - 2) === ']]')
                temp[last_index] = temp[last_index].substring(0, temp[last_index].length - 2);

            return temp;
        }
        else {
            return [ remove_exterior(lst, 2) ];
        }
    }
    else {
        return lst.split(' ');
    }
}

function format(text) {
    let temp = '';
    let lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let start = 0;
        let skip = false;

        if (lines[i].length > 5 && lines[i].substring(0, 5) === '- ###') {
            temp += '-';
            start = 5;
        }

        if (lines[i].length > 23 && lines[i].substring(0, 19) === '### <<list-links \'[') {
            let sub = lines[i].substring(19);
            let lst = sub.substring(0, sub.length - 5).split(']');
            let good = [];
            let bad = [];

            for (let j = 0; j < lst.length; j++) {
                if (lst[j].length > 4) {
                    if (lst[j].substring(0, 5) === '!tag[') {
                        bad.push(lst[j].substring(5));
                    }
                    else if (lst[j].substring(0, 4) === 'tag[') {
                        good.push(lst[j].substring(4));
                    }
                    else {
                        good.push(lst[j]);
                    }
                }
                else {
                    good.push(lst[j]);
                }
            }

            temp += '%' + good + ((bad.length > 0) ? ('|' + bad) : '') + '%';

            skip = true;
        }

        // TODO: external links
        // TODO: quotations

        if (lines[i].length > 5 && lines[i].substring(0, 5) === '[img[') {
            temp += '^' + lines[i].substring(5, lines[i].length - 2) + '^';

            skip = true;
        }

        if (!skip) {
            for (let k = start; k < lines[i].length; k++) {
                if (k === 0 && lines[i][k] === '#' && k < lines[i].length && lines[i][k+1] === ' ')
                    temp += '#';

                if (lines[i][k] === '[' && k < lines[i].length && lines[i][k+1] === '[') k++;
                if (lines[i][k] === ']' && k < lines[i].length && lines[i][k+1] === ']') k++;

                temp += lines[i][k];
            }
        }

        temp += '\n';
    }

    return temp;
}