let amoeba;

let current = [50, 50];
let target = [50, 50];

let speed = 0.2;
let moving = false;

let size = 30;
let offsetX, offsetY;

let mouse_pos;

let food_queue = [];
let food_eaten = 0;

window.onload = function() {
    amoeba = document.getElementById('amoeba');

    set_position(50, 50);
    set_size(30);

    document.onmousemove = e => {
        mouse_pos = [
            ((e.clientX / window.innerWidth) * 100),
            ((e.clientY / window.innerHeight) * 100)
        ];

        if (food_queue.length === 0) {
            target[0] = mouse_pos[0] - offsetX;
            target[1] = mouse_pos[1] - offsetY;
        }
    };

    document.onclick = () => {
        let food = document.createElement('div');
        food.setAttribute('id', 'food');
        document.body.appendChild(food);

        let food_pos = [
            mouse_pos[0] - offsetX,
            mouse_pos[1] - offsetY
        ];

        food.style.left = mouse_pos[0] + "%";
        food.style.top = mouse_pos[1] + "%";

        food_queue.push([food_pos, food]);

        if (food_queue.length === 1) target = food_pos;
    };

    move_towards();

    emote();

    for (let i = 0; i < 100; i++) {
        let speck = document.createElement('div');
        speck.setAttribute('id', 'speck');
        document.body.appendChild(speck);

        speck.style.left = (Math.random() * 100) + "%";
        speck.style.top = (Math.random() * 100) + "%";
    }
}

function set_position(left, top) {
    current = [left, top];

    amoeba.style.left = left + "%";
    amoeba.style.top = top + "%";
}

function set_size(new_size) {
    size = new_size;

    amoeba.style.width = size + "px";
    amoeba.style.height = size + "px";

    amoeba.style.fontSize = (size / 2) + "px";

    offsetX = ((size / 2) / window.innerWidth) * 100;
    offsetY = ((size / 2) / window.innerHeight) * 100;
}

function move_towards() {
    let updated = [current[0], current[1]];
    let stopped = [false, false];

    let current_speed = food_queue.length > 0 ? (speed * 4) : speed;

    if (current[0] < target[0]) {
        if (target[0] - current[0] >= current_speed) updated[0] += current_speed;
        else stopped[0] = true;
    }
    else {
        if (current[0] - target[0] >= current_speed) updated[0] -= current_speed;
        else stopped[0] = true;
    }

    if (current[1] < target[1]) {
        if (target[1] - current[1] >= current_speed) updated[1] += current_speed;
        else stopped[1] = true;
    }
    else {
        if (current[1] - target[1] >= current_speed) updated[1] -= current_speed;
        else stopped[1] = true;
    }

    moving = !stopped[0] || !stopped[1];

    if (!moving && food_queue.length > 0) {
        new Audio("yum.mp3").play();
        amoeba.innerText = ":o";

        setTimeout(() => {
            amoeba.innerText = ":)";
        }, 300);

        food_eaten++;

        document.getElementById('hints').innerHTML =
            "your very own pet amoeba<br>" +
            "click anywhere to drop food<br>" +
            "food eaten: " + food_eaten + "<br><br>" +
            "(volume warning)";

        food_queue[0][1].remove();
        food_queue.shift();

        if (food_queue.length > 0) target = food_queue[0][0];
        else target = [
            mouse_pos[0] - offsetX,
            mouse_pos[1] - offsetY
        ];

        set_size(size + 4);
    }

    set_position(updated[0], updated[1]);

    setTimeout(move_towards, 10);
}

function emote() {
    if (!moving) {
        let emotions = [";)", ":3", ":D", "(:", ":|", ":(", ":/", "=)", ":>", ":]", "8)"];

        if (Math.random() < 0.75) amoeba.innerText = emotions[Math.floor(Math.random() * emotions.length)];

        setTimeout(() => {
            amoeba.innerText = ":)";
        }, 500);
    }

    setTimeout(emote, 2000);
}