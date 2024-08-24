var seafaring;
var deadeye;
var grit;
var leeway;

var available_scores;
var score_text;

var officers = [ 'Captain', 'First Mate', 'Sargeant-At-Arms', 'Bosun', 'Navigator', 'Chaplain' ];

function generate() {
    seafaring = document.getElementById('seafaring');
    deadeye = document.getElementById('deadeye');
    grit = document.getElementById('grit');
    leeway = document.getElementById('leeway');

    available_scores = [ 1, 2, 3, 4 ];
    setScore(seafaring);
    setScore(deadeye);
    setScore(grit);
    setScore(leeway);

    score_text = [ seafaring, deadeye, grit, leeway ];
    setBonus(2);
    setBonus(2);

    score_text = [ seafaring, deadeye, grit, leeway ];
    var officer_name = officers[rand(officers.length)];

    var officer_text = document.getElementById('officer');
    officer_text.innerText = officer_name;

    switch (officer_name) {
        case 'Captain':
            setBonus(1);
            setBonus(1);
            break;

        case 'First Mate':
            seafaring.innerText += "+2";
            break;

        case 'Sargeant-At-Arms':
            deadeye.innerText += "+2";
            break;

        case 'Bosun':
            grit.innerText += "+2";
            break;

        case 'Navigator':
            leeway.innerText += "+2";
            break;

        case 'Chaplain':
            officer_text.innerHTML += " (sailors restore <em>2 Sanity</em> rather than <em>1</em> when communing with <em>The Foghorn Call</em> while a <em>Chaplain</em> is on board)"
            break;
    }
}

function rand(length) {
    return Math.floor(Math.random() * length);
}

function setScore(text) {
    var index = rand(available_scores.length);
    text.innerText = available_scores[index].toString();
    available_scores.splice(index, 1);
}

function setBonus(bonus) {
    var index = rand(score_text.length);
    score_text[index].innerText += "+" + bonus;
    score_text.splice(index, 1);
}