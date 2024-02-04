let size = 50;

let grid = [];
let walls = [];
let spikes = [];
let food = [];
let exit;

let portals = [];
let portal_positions = [];

let current_position = [];
let last_code;
let paused;

let log;
let last_action;

let start_time;

window.onload = function() {
    document.body.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case 38: move(0, -1); break;
            case 40: move(0, 1); break;
            case 39: move(1, 0); break;
            case 37: move(-1, 0); break;
        }
    });

    initialize();
}

function initialize() {
    grid = [];
    walls = [];
    spikes = [];
    food = [];
    paused = false;

    let field = document.getElementById('field');
    field.innerHTML = '';

    log = document.getElementById('log');

    log_action('v1.1');
    log_action('start (← ↑ ↓ →)');

    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'flex row');
        field.appendChild(row);

        grid.push([]);

        for (let j = 0; j < size; j++) {
            let tile = document.createElement('p');
            tile.setAttribute('class', 'tile');
            row.appendChild(tile);

            grid[i][j] = tile;

            let distance = Math.sqrt(
                Math.pow(Math.abs(i - (size / 2)), 2) +
                Math.pow(Math.abs(j - (size / 2)), 2));

            distance = Math.pow(1.2, distance);

            let inner_ring = 2;

            if (Math.abs(2 - distance) <= 0.1) {
                tile.innerHTML = '▣';
                tile.style.color = 'var(--wall)';

                walls.push(tile);
            }
            else if (distance < inner_ring) tile.innerHTML = '.';
            else {
                if (Math.floor(Math.random() * 200) === 0) {
                    tile.innerHTML = '*';
                    tile.style.color = 'var(--spike)';

                    spikes.push(tile);
                }
                else if (Math.floor(Math.random() * 400) === 0) {
                    tile.innerHTML = '▣';
                    tile.style.color = 'var(--wall)';

                    walls.push(tile);
                }
                else if (Math.floor(Math.random() * 400) === 0) {
                    tile.innerHTML = '✿';
                    tile.style.color = 'var(--food)';

                    food.push(tile);
                }
                else tile.innerHTML = (Math.floor(Math.random() * distance) === 0) ? '.' : '';
            }
        }
    }

    portal_positions[0] = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
    portals[0] = grid[portal_positions[0][1]][portal_positions[0][0]];
    portals[0].innerHTML = '◐';
    portals[0].style.color = 'var(--portal)';

    portal_positions[1] = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
    portals[1] = grid[portal_positions[1][1]][portal_positions[1][0]];
    portals[1].innerHTML = '◑';
    portals[1].style.color = 'var(--portal)';

    exit = grid[Math.floor(Math.random() * size)][Math.floor(Math.random() * size)];
    exit.innerHTML = '◎';
    exit.style.color = 'var(--exit)';

    current_position = [size / 2, size / 2];
    last_code = '.';

    set_position(size / 2, size / 2);

    start_time = Date.now();
}

function move(x, y) {
    if (paused) return;

    set_position(current_position[0] + x, current_position[1] + y);
}

function set_position(x, y) {
    if (x < 0 || x >= size ||
        y < 0 || y >= size ||
        walls.includes(grid[y][x])) {
        log_action('wall (bonk)');
        return;
    }
    else if (spikes.includes(grid[y][x])) {
        set_position(size / 2, size / 2);
        log_action('spike (ouch)');
        return;
    }
    else if (portals[0] === grid[y][x]) {
        set_position(portal_positions[1][0] + 1, portal_positions[1][1]);
        log_action('portal (zoom)');
        return;
    }
    else if (portals[1] === grid[y][x]) {
        set_position(portal_positions[0][0] - 1, portal_positions[0][1]);
        log_action('portal (zoom)');
        return;
    }
    else if (exit === grid[y][x]) {
        if (food.length === 0) {
            paused = true;
            setTimeout(initialize, 1000);

            log_action('exit (' + ((Date.now() - start_time) / 1000) + ')');
        }
        else {
            log_action('exit (locked)');
            return;
        }
    }

    let current_tile = grid[current_position[1]][current_position[0]];

    current_tile.innerHTML = last_code;
    current_tile.style.color = "var(--grass)";

    current_position = [x, y];
    current_tile = grid[current_position[1]][current_position[0]];

    last_code = current_tile.innerHTML;

    current_tile.innerHTML = '☻';
    current_tile.style.color = "var(--player)";

    if (food.includes(grid[y][x])) {
        last_code = '';
        food.splice(food.indexOf(grid[y][x]), 1);
        log_action('food (yum)');
    }
}

function log_action(action) {
    if (action === last_action) return;

    log.innerHTML = '>' + action + '\n' + log.innerHTML;
    last_action = action;
}