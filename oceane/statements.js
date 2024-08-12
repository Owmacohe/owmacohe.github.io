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
    "<i>*points to herself*</i> This old thing?",
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
    "I love this guy. He’s a weirdo.",
    "Calm down, Shakira",
    "I love smelling things at Walmart",
    "The good ol’ ass",
    "I will sing the fuck out of… myself",
    "Ho! He’s so like oh!",
    "You still exist to receive my hate",
    "Coming out the oven. The baking… bread",
    "I don’t like people. I mean, I do, like… conceptually",
    "You’re the fish I never thought I was gonna have on my boat",
    "You know, I fuck like a Camembert, they say",
    "Now who’s the turkey? Huh?!",
    "Oh! I just made a chicken!",
    "Ooh, I’ve got a wild horse over here!",
    "Drive meeeeee… out?",
    "Hey! Je suis pas un potato bag!",
    "Hey, what’s your #porn these days?",
    "It’s like a fruit salad of porn. Are you more into mango or kiwi tonight?",
    "Oh, look at that good ham!",
    "What am I, your sunscreen?",
    "Mes préférées sont les crackheads du Village",
    "Because bla bla blee bla bla bla",
    "<i>*holding my face*</i> Look at this beautiful pumpkin! Ready for the fall",
    "Things are going fancy",
    "Oh you know. I’m your big dust you know",
    "I love weird people. I’m pretty weird myself",
    "It’s not a body, it’s <i>*the*</i> body",
    "You motherfucker from another mother",
    "And everything goes to numb",
    "Oppa Canman Style",
    "Someone is breaking into us",
    "I’m like, not a good character you know? I’m like, very very bad you know?",
    "<i>*killing someone with an axe in Skyrim*</i> Oh! You feel good bro?!",
    "Tu peux jeter du fromage sur un enfant",
    "Hi hi, I’m a funny cookie!",
    "T’es… t’es… j’ai pas de mots en Anglais pour ça",
    "Get the door… and don’t come back with the keys",
    "J’ai le fucking raclette booty",
    "You’re like the mantis and I’m like the big leaf",
    "I want to make people less less, and a bit more",
    "I have a weird steak",
];

let statement_element;

let animations;

window.onload = function() {
    document.getElementById('count').innerHTML = 'now featuring ' + statements.length + ' statements!';

    statement_element = document.getElementById('statement');

    animations = true;
};

function show_statement() {
    if (statements.length === 0) location.reload();

    var index = Math.floor(Math.random() * statements.length);
    var statement = statements[index];
    statements.splice(index, 1);

    statement_element.innerHTML = '"' + statement + '"';

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