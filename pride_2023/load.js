const image_count = 80;

window.onload = function() {
    let column_1 = document.createElement('div');
    column_1.setAttribute('class', 'column');
    document.body.appendChild(column_1);

    let column_2 = document.createElement('div');
    column_2.setAttribute('class', 'column');
    document.body.appendChild(column_2);

    let column_3 = document.createElement('div');
    column_3.setAttribute('class', 'column');
    document.body.appendChild(column_3);

    let columns = [ column_1, column_2, column_3 ];
    let current = 0;

    for (let i = 0; i < image_count; i++) {
        columns[current].innerHTML += '<img src="images/' + (i+1) + '.jpg">';

        current++;
        if (current >= columns.length) current = 0;
    }
}