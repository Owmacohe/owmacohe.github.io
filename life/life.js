let elements = [];
let ages = [];
let next = [];
let saved = [];
let empty = [];
let started = false;
let clicking = false;
let drawing = true;
let hasReset = false;
let scale = 0.6;

window.onload = setup;

function setup() {
    scale = document.getElementById('scale').value;
    if (scale === '') scale = 1;
    if (scale > 35) scale = 35;
    if (scale < 1) scale = 1;

    let factor = 20 * (1.1 * scale);

    scale *= 0.7;

    document.body.onmousedown = () => { clicking = true };
    document.body.onmouseup = () => { clicking = false };

    const grid = document.getElementById('grid');

    for (let i = 0; i < window.innerHeight / factor; i++) {
        const row = document.createElement('DIV');
        grid.appendChild(row);
        row.setAttribute('class', 'flex_row');

        elements.push([]);
        ages.push([]);
        next.push([]);
        saved.push([]);
        empty.push([]);

        for (let j = 0; j < window.innerWidth / factor; j++) {
            const temp = document.createElement('DIV');
            row.appendChild(temp);
            temp.setAttribute('class', 'flex_element');
            temp.setAttribute('onmouseover', 'select(this, true)');
            temp.setAttribute('onmousedown', 'select(this, false)');
            temp.setAttribute('id', i + '|' + j);

            temp.setAttribute('style', getWidthAndHeight());

            elements[i].push(false);
            ages[i].push(0.5);
            next[i].push(false);
            saved[i].push(false);
            empty[i].push(false);
        }
    }
}

function getWidthAndHeight() {
    let amount = scale + 'vw;';
    return 'width: ' + amount + ' height: ' + amount;
}

function markForReload() {
    document.getElementById('warning').style.display = 'block';
}

function setElem(grid, y, x, value) {
    const elem = document.getElementById(y + '|' + x);

    const colour = value ? 'black' : 'white';
    elem.setAttribute('style', getWidthAndHeight() + ' background: ' + colour + ';');

    grid[y][x] = value;

    if (!started && clicking) {
        if (!hasReset) {
            hasReset = true;
            setGrid(saved, elements);
        }

        saved[y][x] = value;
    }
}

function getElem(grid, y, x) {
    return grid[y][x];
}

function select(elem, hover) {
    const temp = elem.getAttribute('id');
    const split = temp.split('|');

    if (!hover) {
        drawing = !getElem(elements, split[0], split[1]);
        clicking = true;
    }

    if (clicking) setElem(elements, split[0], split[1], drawing);
}

function start() {
    if (!started) {
        started = true;
        hasReset = false;
        document.getElementById('status').innerHTML = 'ON';
        step();

        document.getElementById('reset').style.display = 'block';
    }
}

function stop() {
    if (started) {
        started = false;
        document.getElementById('status').innerHTML = 'OFF';
    }
}

function reset() {
    stop();
    setGrid(elements, saved);
    hasReset = true;

    document.getElementById('reset').style.display = 'none';
}

function getNeighbourCount(y, x, maxY, maxX) {
    let count = 0;

    if (x-1 > 0 && getElem(elements, y, x-1)) count++;
    if (x+1 < maxX-1 && getElem(elements, y, x+1)) count++;
    if (y-1 > 0 && getElem(elements, y-1, x)) count++;
    if (y+1 < maxY-1 && getElem(elements, y+1, x)) count++;

    if (x-1 > 0 && y-1 > 0 && getElem(elements, y-1, x-1)) count++;
    if (x-1 > 0 && y+1 < maxY-1 && getElem(elements, y+1, x-1)) count++;
    if (x+1 < maxX-1 && y-1 > 0 && getElem(elements, y-1, x+1)) count++;
    if (x+1 < maxX-1 && y+1 < maxY-1 && getElem(elements, y+1, x+1)) count++;

    return count;
}

function setGrid(to, from) {
    let changed = false;
    const y = elements.length;
    const x = elements[0].length;

    for (let i2 = 0; i2 < y; i2++) {
        for (let j2 = 0; j2 < x; j2++) {
            if (getElem(to, i2, j2) !== from[i2][j2])
                changed = true;

            if (getElem(to, i2, j2)) {
                if (from[i2][j2]) ages[i2][j2]++;
                else ages[i2][j2] = 0;
            }

            setElem(to, i2, j2, from[i2][j2]);
        }
    }

    return changed;
}

function step() {
    if (started) {
        let speed = document.getElementById('speed').value;

        if (speed === '') speed = 1;
        let offset = 1 / speed;

        if (speed !== 0 && offset !== Infinity && !isNaN(offset)) {
            const y = elements.length;
            const x = elements[0].length;

            let allGone = true;

            for (let i1 = 0; i1 < y; i1++) {
                for (let j1 = 0; j1 < x; j1++) {
                    next[i1][j1] = false;

                    let alive = getElem(elements, i1, j1);
                    let count = getNeighbourCount(i1, j1, y, x);

                    if ((alive && count > 1 && count < 4) || (!alive && count === 3)) {
                        next[i1][j1] = true;
                        allGone = false;
                    }
                }
            }

            if (started && !allGone) setTimeout(step, 100 * offset);

            if (allGone || !setGrid(elements, next)) stop();
        }
        else {
            setTimeout(step, 0);
        }
    }
}