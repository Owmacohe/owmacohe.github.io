let size = 61;
let boxes = [];
let current;
let step_count;
let trapped = false;

let dir_list = [];
let time_to_pivot = false;

let seed = 'start';

window.onload = function () {
    let maze = document.getElementById('maze');
    maze.style.width = (size * (12 + 2)) + 'px';

    for (let i = 0; i < size; i++) {
        let column = [];
        boxes.push(column);

        for (let j = 0; j < size; j++) {
            let box = document.createElement('div');
            box.classList.add('box');
            // box.innerText = (j+1) + ' ' + (size-i);
            maze.appendChild(box);

            column.push(box);
        }
    }

    reset();
    seed = get_code(seed);
}

function reset() {
    for (let i = 1; i < size + 1; i++)
        for (let j = 1; j < size + 1; j++)
            set_box(j, i, false);

    current = [Math.ceil(size / 2), Math.ceil(size / 2)];
    set_current();

    dir_list = [];

    time_to_pivot = false;
    trapped = false;

    rand_count = 0;
    seed = get_code(document.getElementById('seed').value);
}

function step(clicked = false) {
    if (trapped) {
        if (clicked) {
            reset();
            step();
        }
    }
    else {
        if (get_surrounding(current[0], current[1]) === 4) return;

        if (clicked) seed = get_code(document.getElementById('seed').value);

        current = get_next_empty_position();
        set_current();

        step_count++;

        setTimeout(step, 10);
    }
}

let rand_count = 0;

function get_code(seed_name) {
    if (seed_name.length < 5) seed_name = ('_____'+seed_name).slice(-5);

    let code = 0;

    for (let i = 0; i < seed_name.length; i++) {
        var char_code = seed_name.charCodeAt(i);
        code = ((code<<5)-code)+char_code;
        code = code & code; // Convert to 32bit integer
    }

    return Math.abs(code);
}

function seeded_rand() {
    rand_count++;
    return (((((100011979 + 500067713) % 900066731) * ((((seed + rand_count) * 800067089) + 800068411) % 800053967)) + 900067309) % 900066571) / 1000000000;
}

function get_random_direction() {
    let rand = Math.floor(seeded_rand() * 4);

    switch (rand) {
        case 0: return [1, 0];
        case 1: return [-1, 0];
        case 2: return [0, 1];
        case 3: return [0, -1];
        default: return [1, 0];
    }
}

function get_random_direction_x() {
    let rand = Math.floor(seeded_rand() * 2);

    switch (rand) {
        case 0: return [1, 0];
        case 1: return [-1, 0];
        default: return [1, 0];
    }
}

function get_random_direction_y() {
    let rand = Math.floor(seeded_rand() * 2);

    switch (rand) {
        case 0: return [0, 1];
        case 1: return [0, -1];
        default: return [0, 1];
    }
}

function get_next_empty_position() {
    if (get_surrounding(current[0], current[1]) === 4) return null;

    let last_dir = dir_list[dir_list.length - 1];

    let dir = [];

    if (time_to_pivot) {
        if (last_dir[0] !== 0) dir = get_random_direction_y();
        else dir = get_random_direction_x();
    }
    else {
        dir = get_random_direction_preferred();
    }

    let test = add(current, dir);
    let loop_count = 0;

    while (
        get_filled(test[0], test[1]) ||
        get_surrounding_block(test[0], test[1]) >= 3)
    {
        if (time_to_pivot) {
            if (last_dir[0] !== 0) dir = get_random_direction_y();
            else dir = get_random_direction_x();
        }
        else {
            dir = get_random_direction_preferred();
        }

        test = add(current, dir);

        loop_count++;

        if (loop_count >= 100) {
            console.log('Infinite loop!');
            trapped = true;
            break;
        }
    }

    dir_list.push(dir);

    if (dir_list.length >= 2) {
        last_dir = dir_list[dir_list.length - 1];
        let last_last_dir = dir_list[dir_list.length - 2];
        time_to_pivot = last_dir[0] === last_last_dir[0] && last_dir[1] === last_last_dir[1];
    }

    return test;
}

function get_random_direction_preferred(get_block = true) {
    if (get_surrounding(current[0], current[1]) === 4) return null;

    let up = get_surrounding_block(current[0], current[1] + 1);
    let down = get_surrounding_block(current[0], current[1] - 1);
    let right = get_surrounding_block(current[0] + 1, current[1]);
    let left = get_surrounding_block(current[0] - 1, current[1]);

    let min = [ up, down, right, left ].min();
    let min_directions = [];

    if (up === min) min_directions.push([0, 1]);
    if (down === min) min_directions.push([0, -1]);
    if (right === min) min_directions.push([1, 0]);
    if (left === min) min_directions.push([-1, 0]);

    if (get_block && min_directions.length <= 2) {
        return get_random_direction_preferred(false);
    }
    else {
        return min_directions[Math.floor(seeded_rand() * min_directions.length)];
    }
}

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

function add(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
}

function valid(x, y) {
    return x > 0 && x <= size &&
           y > 0 && y <= size;
}

function same_axis(a, b) {
    return (a[0] !== 0 && b[0] !== 0) || (a[1] !== 0 && b[1] !== 0);
}

function set_current() {
    set_box(current[0], current[1], true);
}

function get_current() {
    return get_filled(current[0], current[1]);
}

function set_box(x, y, filled) {
    let box = get_box(x, y);
    if (box === null) return;

    if (filled) {
        box.classList.add('box_filled');
    }
    else {
        box.classList.remove('box_filled');
    }
}

function get_box(x, y) {
    if (x-1 < 0 || x-1 >= size || size - y < 0 || size - y >= size) return null;

    return boxes[size - y][x-1];
}

function get_filled(x, y, ignore = null, check_valid = true) {
    if (ignore !== null && x === ignore[0] && y === ignore[1]) return false;
    return (check_valid && !valid(x, y)) || get_box(x, y).classList.contains('box_filled');
}

function get_surrounding(x, y) {
    let count = 0;

    if (get_filled(x+1, y)) count++;
    if (!valid(x+1, y)) count++;
    if (get_filled(x-1, y)) count++;
    if (!valid(x-1, y)) count++;
    if (get_filled(x, y+1)) count++;
    if (!valid(x, y+1)) count++;
    if (get_filled(x, y-1)) count++;
    if (!valid(x, y-1)) count++;

    return count;
}

function get_surrounding_block(x, y, ignore = null) {
    let count = 0;

    if (get_filled(x+1, y+1, ignore)) count++;
    if (!valid(x+1, y+1, ignore)) count++;
    if (get_filled(x+1, y, ignore)) count++;
    if (!valid(x+1, y, ignore)) count++;
    if (get_filled(x+1, y-1, ignore)) count++;
    if (!valid(x+1, y-1, ignore)) count++;
    if (get_filled(x, y+1, ignore)) count++;
    if (!valid(x, y+1, ignore)) count++;
    if (get_filled(x, y-1, ignore)) count++;
    if (!valid(x, y-1, ignore)) count++;
    if (get_filled(x-1, y+1, ignore)) count++;
    if (!valid(x-1, y+1, ignore)) count++;
    if (get_filled(x-1, y, ignore)) count++;
    if (!valid(x-1, y, ignore)) count++;
    if (get_filled(x-1, y-1, ignore)) count++;
    if (!valid(x-1, y-1, ignore)) count++;

    return count;
}