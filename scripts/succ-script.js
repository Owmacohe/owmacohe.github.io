var succulents = 0;
var day = 0;
var succoins = 0;

var marketWealth = 5;
var marketSize = 5;
var demand = [];
var askingPrice = [];

var daySpeed = 10;

//<button onclick="sell()"><h2 id="buyer"></h2><h3 id="gain"></h3></button>

function setup() {
  for (var i = 0; i < marketSize; i++) {
    demand[i] = (Math.floor(Math.random() * marketWealth) + 1);
    askingPrice[i] = demand[i] + (Math.floor(Math.random() * (marketWealth / 2)));

    var newMarket = document.createElement("BUTTON");
    document.getElementById("markets").appendChild(newMarket);
    newMarket.setAttribute("onclick", "sell("+i+")");

    var newBuyer = document.createElement("H2");
    newMarket.appendChild(newBuyer);
    newBuyer.setAttribute("class", "buyers");

    var newGain = document.createElement("H3");
    newMarket.appendChild(newGain);
    newGain.setAttribute("class", "gains");
  }
}

function grow(iterations) {
  for (var i = 0; i < iterations; i++)
    succulents++;
}

function sell(marketNum) {
  if (succulents >= demand[marketNum]) {
    succulents -= demand[marketNum];
    succoins += askingPrice[marketNum];

    if (askingPrice[marketNum] > demand[marketNum]) {
      askingPrice[marketNum]--;
    }
  }
}

var resourseCheck = setInterval(function() {
  document.getElementById("succCount").innerHTML = "SUCCULENTS: " + succulents;
  document.getElementById("dayCount").innerHTML = "DAY: " + day;
  document.getElementById("wealthCount").innerHTML = "MARKET WEALTH: " + marketWealth;
  document.getElementById("coinsCount").innerHTML = "SUCCOINS: " + succoins;

  for (var i = 0; i < marketSize; i++) {
    document.getElementsByClassName("buyers")[i].innerHTML = "Sell <em>"+ demand[i] +"</em> succulents for <em>"+ askingPrice[i] +"</em> succoins";

    var gainText = document.getElementsByClassName("gains")[i];
    var gain = Math.round((100 * ((askingPrice[i] / demand[i]) - 1)));
    gainText.innerHTML = "Percentage gain: " + gain + "%";
    gainText.style.color = "hsl("+gain+", 200%, 50%)";

    if (gain >= 275) {
      gainText.style.color = "hsl(275, 200%, 50%)";
    }
  }

  //console.log("SUCC: " + succulents + "\nCOIN: " + succoins + "\nDEM: " + demand + "\nASK: " + askingPrice);
}, 50);

var dayIncrease = setInterval(function() {
  document.getElementById("dayCount").innerHTML = "DAY: " + ++day;

  if (succoins >= (marketWealth * 5)) {
    marketWealth += 10;
  }

  for (var i = 0; i < marketSize; i++) {
    demand[i] = (Math.floor(Math.random() * marketWealth) + 1);
    askingPrice[i] = demand[i] + (Math.floor(Math.random() * (marketWealth / 2)));
  }
}, (daySpeed * 1000));
