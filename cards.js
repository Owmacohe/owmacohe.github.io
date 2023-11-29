let cards = [
    [
        'My Friend Aki',
        'Unity 3D, C#, Blender, Substance Painter',
        'https://myfriendaki.com',
        'https://store.steampowered.com/app/2584180/My_Friend_Aki',
        'https://duck-duck-juice.itch.io/my-friend-aki',
        'A first-person 3D mall exploration and puzzle solving game with a good dose of story and horror. Use ' +
        'improvised tools to solve the environmental puzzles, discover the gloomy husk of an abandoned ' +
        'mall, and use the dynamic lighting system to bring areas of the game back to life.',
        'Over the game\'s 6 month development, I acted as production manager, programming and puzzle implementation ' +
        'lead, and 3D modeller alongside my other team members. I worked using the <a ' +
        'href="https://github.com/StephanieRct/NiEngine">NiEngine state engine</a> to implement virtually all ' +
        'interactions within the game, from menu screens, to puzzles, and even for the credits. I also put the ' +
        'game\'s <a href="https://myfriendaki.com">website</a> together.\n\nMy Friend Aki released on ' +
        '<a href="https://store.steampowered.com/app/2584180/My_Friend_Aki">Steam</a> and ' +
        '<a href="https://duck-duck-juice.itch.io/my-friend-aki">Itch</a> on November 9th 2023, and has since ' +
        'surpassed 190 downloads and over 1,000 impressions. My team and I are overjoyed and are extremely thankful ' +
        'for everyone who wishlisted, downloaded, and played the game.',
        'my_friend_aki.png'
    ],
    [
        'UNDERSCORE',
        'Unity 3D, C#, Blender',
        '', '',
        'https://omch.itch.io/underscore',
        'An experimental narrative game project that utilises environmental exploration, advanced non-linear ' +
        'dialogue, and multimedia to reflect on ideas of both alienation and kinship. Through engagement with many ' +
        'entities across three different acts, the player has the chance to explore concepts of shared suffering, ' +
        'understanding, and joy.',
        'The work was created in an attempt to explore concepts of choice and narrative through various academic ' +
        'definitions and classifications of game design. Through these novel approaches to classic narrative and ' +
        'game design scenarios (e.g. false choice, dilemma, delayed effect, etc.), a new approach is taken to the ' +
        'concepts of collective emotion and individual catharsis. This dense intertwining of both puzzle and story ' +
        'allow the game to effectively communicate its concepts of collectiveness.\n\nI personally modelled, ' +
        'textured, and lit all characters, objects, and environments within the game. Furthermore, I also developed ' +
        'a rudimentary dialogue system to aid with the game\'s non-linear story gameplay, the act of which inspired ' +
        'me to begin development on <a href="https://github.com/owmacohe/descant">Descant</a>, my custom Unity ' +
        'Dialogue System.\n\nUNDERSCORE was exhibited during the ' +
        '<a href="https://milieux.concordia.ca/the-commons">Milieux "Commons" Expo</a> in September 2023.',
        'underscore.jpg'
    ],
    [
        'Descant',
        'C#',
        'https://github.com/owmacohe/descant',
        '', '',
        'Descant is a Unity dialogue system plugin. It aims to hit the sweet spot between quality UI, powerful ' +
        'features, and easy-to-lean functionality, while also adding optional \'dialogue enhancements\' that ' +
        'introduce features to break away from underwhelming trends seen in many interactive fiction games. These ' +
        'node enhancements act similar to Unity’s standard GameObject Component system.',
        'The Unity Asset Store is chock full of many types of dialogue plugins, ranging from feature-rich, to ' +
        'ultra-minimalist, to downright bad. Descant\'s modular approach is so-far not explored in the world of ' +
        'Unity dialogue systems. The project will be free <i>(and hopefully collaborative open-source)</i> forever.',
        'descant.png'
    ],
    [
        'Last Breath Of A New Empire',
        'Unity 2D, C#',
        '', '',
        'https://omch.itch.io/last-breath',
        'A short, narrative-focused resource-management game inspired by real-Time Strategy (RTS) classics such as ' +
        'Stellaris or Age of Empires. Traditional RTS games focus sp heavily on gameplay that story is often left ' +
        'behind, and Last Breath Of A New Empire attempts to flip that script.',
        '\n\n\n\n',
        'lboane.jpg'
    ],
    [
        'Pantry',
        'Javascript',
        'https://github.com/owmacohe/pantry',
        '', '',
        'A tag-based wiki system is inspired by <a href="https://tiddlywiki.com">TiddlyWiki</a>. Operating purely ' +
        'through Javascript magic, it turns MarkDown files into hypertext articles, which can be tagged, linked to, ' +
        'and generated as dynamic lists. It requires no programming knowledge, save for some understanding of the ' +
        'system\'s modified MarkDown language (see below for more), and the ability to edit <b>.md</b> and ' +
        '<b>.txt</b> files.',
        '\n\n\n\n',
        'pantry.png'
    ],
    [
        'Cultus Dextra',
        'Unity 2D, C#',
        '', '',
        'https://omch.itch.io/cultus-dextra',
        'A resource-management game about culling the weak from your fanatical cult, with inspirations taken from ' +
        'roguelikes and rhythm games. Through story exposition, haunting graphics, and simple mechanics, the game ' +
        'aims to deliver visceral moments, tension, and damned-if-you-do damned-if-you-don\'t gameplay.',
        '\n\n\n\n',
        'cultus_dextra.png'
    ]
];

window.onload = function() {
    let cards_element = document.getElementById('cards');

    for (const i in cards) {
        let card_element = document.createElement('div');
        card_element.setAttribute('class', 'flex column start card');
        card_element.setAttribute('onclick', 'click_card(this)');

        let links = '<div class="flex row center">';

        if (cards[i][2] !== '') links += '<a href="' + cards[i][2] + '" class="card_link">Website</a>';
        if (cards[i][3] !== '') links += '<a href="' + cards[i][3] + '" class="card_link">Steam</a>';
        if (cards[i][4] !== '') links += '<a href="' + cards[i][4] + '" class="card_link">Itch</a>';

        links += '</div>';

        let reminder = cards[i][6] === '' ? '' : '<p class="reminder">Click to expand</p>';

        card_element.innerHTML =
            '<div class="flex row center card_header">' +
                '<h2>' + cards[i][0] + '</h2>' +
                '<h3 style="margin-left: 10px; margin-right: 10px">(' + cards[i][1] + ')</h3>' +
                links +
            '</div>' +
            '<div class="flex row left" style="flex-wrap: nowrap;">' +
                '<div class="flex column left card_text">' +
                    '<p>' + cards[i][5] + '</p>' +
                    '<p class="expanded_text" style="display: none">' + cards[i][6] + '</p>' +
                    reminder +
                '</div>' +
                '<div class="flex column preview" style="background-image: url(previews/' + cards[i][7] + ')"></div>' +
            '</div>';

        cards_element.appendChild(card_element);
    }

    let anchors = document.querySelectorAll('a');

    for (const j in anchors) {
        try {
            anchors[j].setAttribute('rel', 'noreferrer noopener');
            anchors[j].setAttribute('target', '_blank');
        }
        catch { }
    }
};

function click_card(card) {
    let last_expanded = document.getElementById('expanded_card');

    if (last_expanded != null) {
        last_expanded.id = '';

        try {
            last_expanded.getElementsByClassName('reminder_hidden')[0].className = 'reminder';
        }
        catch { }

        last_expanded.getElementsByClassName('expanded_text')[0].style.display = 'none';
    }

    if (last_expanded !== card) {
        card.id = 'expanded_card';

        try {
            card.getElementsByClassName('reminder')[0].className = 'reminder_hidden';
        }
        catch { }

        card.getElementsByClassName('expanded_text')[0].style.display = 'block';
    }
}

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = element;

        node.classList.add(`${prefix}animated`, animationName);

        console.log(node.classList);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });