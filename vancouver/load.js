const image_counts = [30, 21, 21, 28, 34, 16, 22];

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

    for (let i = 0; i < image_counts.length; i++) {
        for (let j = 0; j < image_counts[i]; j++) {
            columns[current].innerHTML += '<img src="images/day_' + (i+1) + '/' + (j+1) + '.jpg">';

            current++;
            if (current >= columns.length) current = 0;
        }
    }
}