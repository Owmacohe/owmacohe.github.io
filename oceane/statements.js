let statements = [
    "You're sharper than the orange",
    "You smell good. What's your secret? Toothbrush?",
    "Money don't fall from the tree",
    "You know what I taste like? Desperation",
    "I can feel you in my lungs",
    "I'm booming you",
    "Crying your ass out",
    "Follow me and I'm leaving you",
    "It's the fox of fruit",
    "I like my big butt. It's keeping me on the ground when I fall down",
    "I'm super weird. It's a state… of USA!",
    "There is some rat, over there. In the street. In the wild",
    "Don't get cocky, get cookie",
    "Like, the Blowjob Land",
    "Nichon Contre Attacke / Nichon: The Awakening",
    "🎵Total duck of the heart 🎵",
    "Getting a taste of your own money",
    "It's not burnt, it's colourful",
    "Mean: never, sassy: everyday",
    "You're the soya to my sauce",
    "Heyyy, you wanna see my garage?",
    "I have this uncle. I hate that guy.",
    "Just a wasp that was trying to kick me in my face",
    "What's real? What's friends?",
    "When fire meets gasoline, ooh ooh",
    "It's been the grandpa of universe",
    "Je t'envoie plein d'urine :)",
    "<i>points to herself</i> This old thing?",
    "I'm… a drama movie!",
    "Crumpling tension",
    "Did you get your wise teeth removed?",
    "You're going to do bold Magic desk",
    "Ask yourself the good question, you know?",
    "J'ai reçu une super lettre d'une personne chère à mon clitoris",
    "30% off of everything! Including my wife!",
    "What do you need? PUBES!",
    "Bam! Guru stuff!",
    "Eyyyyyyy! Behaviour!",
    "First rule: don't fall",
    "Have you seen the anatomic bomb?",
    "It's a gift of universe. It's Christmas",
    "Do you ever wonder what kind of smell does your nose have?",
    "You almost made an Océane out of you",
    "You bring your boombox, I bring my boobox",
    "Excuse the fuck of me?",
    "The tartelette coffin",
    "I hate you for what you just did! Turning up the oil lamp again?!",
];

let statement_element;

let animations;

window.onload = function() {
    statement_element = document.getElementById('statement');

    animations = true;
};

function show_statement() {
    statement_element.innerHTML = '"' + statements[Math.floor(Math.random() * statements.length)] + '"';

    if (animations) animateCSS('#statement', 'tada');
}

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });