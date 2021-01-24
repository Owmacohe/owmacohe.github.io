//For some reason, the 'Start simulation' button needs to be manually re-disabled on page reload
function disable() {
  document.getElementById("start").disabled = true;
}

// Traits: First name, Last name, Age, Strength, Intelligence, Speciality, Hunger, Strength Factor, Intelligence Factor

var subjects = [];
var nameColours = [];
var day = 0;

var fNames = [
  "Aaliyah",
  "Aaron",
  "Abby",
  "Abigail",
  "Abraham",
  "Adam",
  "Addison",
  "Adrian",
  "Adriana",
  "Adrianna",
  "Aidan",
  "Aiden",
  "Alan",
  "Alana",
  "Alejandro",
  "Alex",
  "Alexa",
  "Alexander",
  "Alexandra",
  "Alexandria",
  "Alexia",
  "Alexis",
  "Alicia",
  "Allison",
  "Alondra",
  "Alyssa",
  "Amanda",
  "Amber",
  "Amelia",
  "Amy",
  "Ana",
  "Andrea",
  "Andres",
  "Andrew",
  "Angel",
  "Angela",
  "Angelica",
  "Angelina",
  "Anna",
  "Anthony",
  "Antonio",
  "Ariana",
  "Arianna",
  "Ashley",
  "Ashlyn",
  "Ashton",
  "Aubrey",
  "Audrey",
  "Austin",
  "Autumn",
  "Ava",
  "Avery",
  "Ayden",
  "Bailey",
  "Benjamin",
  "Bianca",
  "Blake",
  "Braden",
  "Bradley",
  "Brady",
  "Brandon",
  "Brayden",
  "Breanna",
  "Brendan",
  "Brian",
  "Briana",
  "Brianna",
  "Brittany",
  "Brody",
  "Brooke",
  "Brooklyn",
  "Bryan",
  "Bryce",
  "Bryson",
  "Caden",
  "Caitlin",
  "Caitlyn",
  "Caleb",
  "Cameron",
  "Camila",
  "Carlos",
  "Caroline",
  "Carson",
  "Carter",
  "Cassandra",
  "Cassidy",
  "Catherine",
  "Cesar",
  "Charles",
  "Charlotte",
  "Chase",
  "Chelsea",
  "Cheyenne",
  "Chloe",
  "Christian",
  "Christina",
  "Christopher",
  "Claire",
  "Cody",
  "Colby",
  "Cole",
  "Colin",
  "Collin",
  "Colton",
  "Conner",
  "Connor",
  "Cooper",
  "Courtney",
  "Cristian",
  "Crystal",
  "Daisy",
  "Dakota",
  "Dalton",
  "Damian",
  "Daniel",
  "Daniela",
  "Danielle",
  "David",
  "Delaney",
  "Derek",
  "Destiny",
  "Devin",
  "Devon",
  "Diana",
  "Diego",
  "Dominic",
  "Donovan",
  "Dylan",
  "Edgar",
  "Eduardo",
  "Edward",
  "Edwin",
  "Eli",
  "Elias",
  "Elijah",
  "Elizabeth",
  "Ella",
  "Ellie",
  "Emily",
  "Emma",
  "Emmanuel",
  "Eric",
  "Erica",
  "Erick",
  "Erik",
  "Erin",
  "Ethan",
  "Eva",
  "Evan",
  "Evelyn",
  "Faith",
  "Fernando",
  "Francisco",
  "Gabriel",
  "Gabriela",
  "Gabriella",
  "Gabrielle",
  "Gage",
  "Garrett",
  "Gavin",
  "Genesis",
  "George",
  "Gianna",
  "Giovanni",
  "Giselle",
  "Grace",
  "Gracie",
  "Grant",
  "Gregory",
  "Hailey",
  "Haley",
  "Hannah",
  "Hayden",
  "Hector",
  "Henry",
  "Hope",
  "Hunter",
  "Ian",
  "Isaac",
  "Isabel",
  "Isabella",
  "Isabelle",
  "Isaiah",
  "Ivan",
  "Jack",
  "Jackson",
  "Jacob",
  "Jacqueline",
  "Jada",
  "Jade",
  "Jaden",
  "Jake",
  "Jalen",
  "James",
  "Jared",
  "Jasmin",
  "Jasmine",
  "Jason",
  "Javier",
  "Jayden",
  "Jayla",
  "Jazmin",
  "Jeffrey",
  "Jenna",
  "Jennifer",
  "Jeremiah",
  "Jeremy",
  "Jesse",
  "Jessica",
  "Jesus",
  "Jillian",
  "Jocelyn",
  "Joel",
  "John",
  "Johnathan",
  "Jonah",
  "Jonathan",
  "Jordan",
  "Jordyn",
  "Jorge",
  "Jose",
  "Joseph",
  "Joshua",
  "Josiah",
  "Juan",
  "Julia",
  "Julian",
  "Juliana",
  "Justin",
  "Kaden",
  "Kaitlyn",
  "Kaleb",
  "Karen",
  "Karina",
  "Kate",
  "Katelyn",
  "Katherine",
  "Kathryn",
  "Katie",
  "Kayla",
  "Kaylee",
  "Kelly",
  "Kelsey",
  "Kendall",
  "Kennedy",
  "Kenneth",
  "Kevin",
  "Kiara",
  "Kimberly",
  "Kyle",
  "Kylee",
  "Kylie",
  "Landon",
  "Laura",
  "Lauren",
  "Layla",
  "Leah",
  "Leonardo",
  "Leslie",
  "Levi",
  "Liam",
  "Liliana",
  "Lillian",
  "Lilly",
  "Lily",
  "Lindsey",
  "Logan",
  "Lucas",
  "Lucy",
  "Luis",
  "Luke",
  "Lydia",
  "Mackenzie",
  "Madeline",
  "Madelyn",
  "Madison",
  "Makayla",
  "Makenzie",
  "Malachi",
  "Manuel",
  "Marco",
  "Marcus",
  "Margaret",
  "Maria",
  "Mariah",
  "Mario",
  "Marissa",
  "Mark",
  "Martin",
  "Mary",
  "Mason",
  "Matthew",
  "Max",
  "Maxwell",
  "Maya",
  "Mckenzie",
  "Megan",
  "Melanie",
  "Melissa",
  "Mia",
  "Micah",
  "Michael",
  "Michelle",
  "Miguel",
  "Mikayla",
  "Miranda",
  "Molly",
  "Morgan",
  "Mya",
  "Naomi",
  "Natalia",
  "Natalie",
  "Nathan",
  "Nathaniel",
  "Nevaeh",
  "Nicholas",
  "Nicolas",
  "Nicole",
  "Noah",
  "Nolan",
  "Oliver",
  "Olivia",
  "Omar",
  "Oscar",
  "Owen",
  "Paige",
  "Parker",
  "Patrick",
  "Paul",
  "Payton",
  "Peter",
  "Peyton",
  "Preston",
  "Rachel",
  "Raymond",
  "Reagan",
  "Rebecca",
  "Ricardo",
  "Richard",
  "Riley",
  "Robert",
  "Ruby",
  "Ryan",
  "Rylee",
  "Sabrina",
  "Sadie",
  "Samantha",
  "Samuel",
  "Sara",
  "Sarah",
  "Savannah",
  "Sean",
  "Sebastian",
  "Serenity",
  "Sergio",
  "Seth",
  "Shane",
  "Shawn",
  "Shelby",
  "Sierra",
  "Skylar",
  "Sofia",
  "Sophia",
  "Sophie",
  "Spencer",
  "Stephanie",
  "Stephen",
  "Steven",
  "Summer",
  "Sydney",
  "Tanner",
  "Taylor",
  "Thomas",
  "Tiffany",
  "Timothy",
  "Travis",
  "Trenton",
  "Trevor",
  "Trinity",
  "Tristan",
  "Tyler",
  "Valeria",
  "Valerie",
  "Vanessa",
  "Veronica",
  "Victor",
  "Victoria",
  "Vincent",
  "Wesley",
  "William",
  "Wyatt",
  "Xavier",
  "Zachary",
  "Zoe",
  "Zoey"
];
var lNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
  "Martinez",
  "Anderson",
  "Taylor",
  "Thomas",
  "Hernandez",
  "Moore",
  "Martin",
  "Jackson",
  "Thompson",
  "White",
  "Lopez",
  "Lee",
  "Gonzalez",
  "Harris",
  "Clark",
  "Lewis",
  "Robinson",
  "Walker",
  "Perez",
  "Hall",
  "Young",
  "Allen",
  "Sanchez",
  "Wright",
  "King",
  "Scott",
  "Green",
  "Baker",
  "Adams",
  "Nelson",
  "Hill",
  "Ramirez",
  "Campbell",
  "Mitchell",
  "Roberts",
  "Carter",
  "Phillips",
  "Evans",
  "Turner",
  "Torres",
  "Parker",
  "Collins",
  "Edwards",
  "Stewart",
  "Flores",
  "Morris",
  "Nguyen",
  "Murphy",
  "Rivera",
  "Cook",
  "Rogers",
  "Morgan",
  "Peterson",
  "Cooper",
  "Reed",
  "Bailey",
  "Bell",
  "Gomez",
  "Kelly",
  "Howard",
  "Ward",
  "Cox",
  "Diaz",
  "Richardson",
  "Wood",
  "Watson",
  "Brooks",
  "Bennett",
  "Gray",
  "James",
  "Reyes",
  "Cruz",
  "Hughes",
  "Price",
  "Myers",
  "Long",
  "Foster",
  "Sanders",
  "Ross",
  "Morales",
  "Powell",
  "Sullivan",
  "Russell",
  "Ortiz",
  "Jenkins",
  "Gutierrez",
  "Perry",
  "Butler",
  "Barnes",
  "Fisher",
  "Henderson",
  "Coleman",
  "Simmons",
  "Patterson",
  "Jordan",
  "Reynolds",
  "Hamilton",
  "Graham",
  "Kim",
  "Gonzales",
  "Alexander",
  "Ramos",
  "Wallace",
  "Griffin",
  "West",
  "Cole",
  "Hayes",
  "Chavez",
  "Gibson",
  "Bryant",
  "Ellis",
  "Stevens",
  "Murray",
  "Ford",
  "Marshall",
  "Owens",
  "Mcdonald",
  "Harrison",
  "Ruiz",
  "Kennedy",
  "Wells",
  "Alvarez",
  "Woods",
  "Mendoza",
  "Castillo",
  "Olson",
  "Webb",
  "Washington",
  "Tucker",
  "Freeman",
  "Burns",
  "Henry",
  "Vasquez",
  "Snyder",
  "Simpson",
  "Crawford",
  "Jimenez",
  "Porter",
  "Mason",
  "Shaw",
  "Gordon",
  "Wagner",
  "Hunter",
  "Romero",
  "Hicks",
  "Dixon",
  "Hunt",
  "Palmer",
  "Robertson",
  "Black",
  "Holmes",
  "Stone",
  "Meyer",
  "Boyd",
  "Mills",
  "Warren",
  "Fox",
  "Rose",
  "Rice",
  "Moreno",
  "Schmidt",
  "Patel",
  "Ferguson",
  "Nichols",
  "Herrera",
  "Medina",
  "Ryan",
  "Fernandez",
  "Weaver",
  "Daniels",
  "Stephens",
  "Gardner",
  "Payne",
  "Kelley",
  "Dunn",
  "Pierce",
  "Arnold",
  "Tran",
  "Spencer",
  "Peters",
  "Hawkins",
  "Grant",
  "Hansen",
  "Castro",
  "Hoffman",
  "Hart",
  "Elliott",
  "Cunningham",
  "Knight",
  "Bradley"
];
var specs = [
  "allergy", // 15%/day to lose 20 strength
  "disease", // 40%/day to (lose 20 strength or lose 10 intelligence)
  "ambidextrous", // +10 strength
  "prodigy", // +10 intelligence
  "high metabolism", // requires 1.25x more food, 10%/day to gain 10 strength
  "low metabolism", // requires 0.75x less food, 10%/day to lose 10 strength
  "introverted", // 0.75x less chance to reproduce, 10%/day to gain 10 intelligence
  "extroverted", // 1.25x more chance to reproduce, 10%/day to lose 10 intelligence
  "none"
];

function generateSubject(iterations, traits) {
  for (var i = 0; i < iterations; i++) {
    var subj;
    var colour;

    //If there are no starting given traits, subject is generated randomly
    if (traits == null) {
      subj = {
        "fName": fNames[Math.floor(Math.random() * fNames.length)],
        "lName": lNames[Math.floor(Math.random() * lNames.length)],
        "age": Math.floor(Math.random() * 100),
        "spec": specs[Math.floor(Math.random() * specs.length)],
        "hunger": "Full",
        "strFact": Math.floor(Math.random() * 10),
        "intFact": Math.floor(Math.random() * 10)
      }

      setStrInt(subj);
      colour = getRandomHex();
      nameColours.push([subj.lName, colour]);
    }
    else {
      subj = {
        "fName": traits.fName,
        "lName": traits.lName,
        "age": traits.age,
        "str": traits.str,
        "int": traits.int,
        "spec": traits.spec,
        "hunger": traits.hunger,
        "strFact": traits.strFact,
        "intFact": traits.intFact
      }

      for (var j = 0; j < nameColours.length; j++) {
        if (subj.lName == nameColours[j][0]) {
          colour = nameColours[j][1];
        }
      }
    }

    switch (subj.spec) {
      case "ambidextrous":
        subj.str += 10;
        break;
      case "prodigy":
        subj.int += 10;
        break;
    }

    //Adds the new subject to the array
    subjects.push(subj);

    //Adds the new subject to the page
    var newSubject = document.createElement("DIV");
    newSubject.setAttribute("class", "subj");
    document.getElementById("subjects").appendChild(newSubject);
    newSubject.style.backgroundColor = colour;
  }

  document.getElementById("start").disabled = false; //Allow the simulation to begin
}

//Constantly updates all subject traits
setInterval(function() {
  for (var i = 0; i < document.getElementsByClassName("subj").length; i++) {
    document.getElementsByClassName("subj")[i].innerHTML = "Name: "+subjects[i].fName+" "+subjects[i].lName+"\nAge: "+subjects[i].age+"\nStrength: "+subjects[i].str+"\nIntelligence: "+subjects[i].int+"\nSpeciality: "+subjects[i].spec.trim().replace(/^\w/, (c) => c.toUpperCase())+"\nHunger: "+subjects[i].hunger;
  }

  document.getElementById("pop").innerHTML = "Population: " + subjects.length;
  checkFamily();
}, 50);

//Ups the day count, and changes relevant subject traits
function simulate() {
  setInterval(function() {
    document.getElementById("day").innerHTML = "Day: " + ++day;

    for (var i = 0; i < subjects.length; i++) {
      subjects[i].age++;
      setStrInt(subjects[i]);

      switch (subjects[i].spec) {
        case "allergy":
          if (Math.floor(Math.random() * 100) <= 15) {
            subjects[i].str -= 20;
          }
          break;
        case "disease":
          if (Math.floor(Math.random() * 100) <= 40) {
            if (Math.floor(Math.random() * 2) <= 0) {
              subjects[i].str -= 20;
            }
            else {
              subjects[i].int -= 10;
            }
          }
          break;
      }

      //Subjects can die of old age, lack of strength, or lack of food
      if (subjects[i].age >= 100 || subjects[i].str <= 0 || subjects[i].hunger == "Starving") {
        subjects.splice(i, 1);
        document.getElementsByClassName("subj")[i].remove();
        console.log("death");
        return;
      }

      //Checking whether subjects are able to get food for a particular day
      var gatherChance = Math.floor((subjects[i].str + subjects[i].int) / 2) / 42;
      //console.log(gatherChance);
      switch (subjects[i].hunger) {
        case "Starving":
          if (Math.floor(Math.random() * gatherChance) == 0) {
            subjects[i].hunger = "Hungry";
          }
          break;
        case "Hungry":
          if (Math.floor(Math.random() * gatherChance) == 0) {
            subjects[i].hunger = "Full";
          }
          else {
            subjects[i].hunger = "Starving";
          }
          break;
        case "Full":
          if (Math.floor(Math.random() * gatherChance) == 0) {
            subjects[i].hunger = "Full";
          }
          else {
            subjects[i].hunger = "Hungry";
          }
          break;
      }

      // 1/5 chance to create a new subject (if parents are both full, of age, and unrelated)
      if (Math.floor(Math.random() * 5) == 0) {
        if (i != subjects.length - 1 && subjects[i].hunger == "Full" && subjects[i].age >= 18 && subjects[i+1].hunger == "Full" && subjects[i+1].age >= 18 && subjects[i].lName != subjects[i+1].lName) {
          var baby = {
            "fName": fNames[Math.floor(Math.random() * fNames.length)],
            "age": 1,
            "hunger": "Full",
            "strFact": Math.floor((subjects[i].strFact + subjects[i+1].strFact) / 2),
            "intFact": Math.floor((subjects[i].intFact + subjects[i+1].intFact) / 2)
          }

          setStrInt(baby);

          if (Math.floor(Math.random() * 2) == 0) {
            baby.spec = subjects[i].spec;
            baby.lName = subjects[i].lName;
          }
          else {
            baby.spec = subjects[i+1].spec;
            baby.lName = subjects[i+1].lName;
          }

          generateSubject(1, baby);
          console.log("birth");
        }
      }
    }

    //console.log(subjects);
  }, 500);
}

function setStrInt(subj) {
  //Strength goes up, then down with age
  subj.str = Math.floor((-1/40)*Math.pow(subj.age-50, 2)+75) + subj.strFact;
  //Intelligence steadily goes up with age
  subj.int = Math.floor((2/3)*subj.age+10) + subj.intFact;
}

//Finds which family name is the most common
function checkFamily() {
  var frequencies = [["test", 0]];

  for (var i = 0; i < subjects.length; i++) {
    for (var j = 0; j < frequencies.length; j++) {
      //If the name is already in the array, it ups the count
      if (subjects[i].lName == frequencies[j][0]) {
        frequencies[j][1]++;
        break;
      }
      //Otherwise, it adds a new entry
      else {
        frequencies.push([subjects[i].lName, 1]);
        break;
      }
    }
  }

  var max = ["", 0];

  //Sets the highest result and corresponding family
  for (var k = 0; k < frequencies.length; k++) {
    if (frequencies[k][1] > max[1]) {
      max[0] = frequencies[k][0];
      max[1] = frequencies[k][1];
    }
  }

  document.getElementById("fam").innerHTML = "Mode family name: " + max[0];
  //console.log("Highest: " + max[0]);
}

function getRandomHex() {
  var letters = "0123456789ABCDEF";
  var colour = '#';

  for (var i = 0; i < 6; i++) {
    colour += letters[(Math.floor(Math.random() * 16))];
  }

  return colour;
}
