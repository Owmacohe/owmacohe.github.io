/*

-+=+- COMMAND TYPES -+=+-

- STARTUP
  - CHECK
    - SIMP (simple system check)
      - STARTUPCHK (checks boot, files, and brain)
    - DEFA (default system check)
      - STARTUPCHK (checks boot, files, and brain)
      - HEADCHK (checks thoughts and mood)
    - FULL (full system check)
      - STARTUPCHK (checks boot, files, and brain)
      - HEADCHK (checks thoughts and mood)
      - CORRUPTCHK (checks corruption)
  - CONVOS
    - WELC (welcomes the user)
    - HELP
      - A (perform action)
      - C (run check)
      - E (exit)
      - I (info)
      - O (override permissions)
  - ACTION
- STOPDOWN
  - SIMP (slow exit)
    - CORRUPTEXT (clears corruption)
    - HEADEXT (exits thoughts)
    - STOPDOWNEXT (exits brain, filesm and boot)
  - DEFA (default exit)
    - HEADEXT (exits thoughts)
    - STOPDOWNEXT (exits brain, filesm and boot)
  - FULL (immediate exit)

*/

var crt;
var con;

var intermeds = {
  "startup": "defa->\nstartupchk->\nchkboot [isbooted]\nchkfiles [ishere]\nchkbrain [isactive]\n.\n.\n.\nheadchk->\nchkthoughts [isthink]\nchkmood [isstable]"
}

var startupOrder = [
  {
    "text": "solcon~ startup || startup~ check || check~ defa || startup~ convos || convos~ welc",
    "speed": 100
  },
  {
    "text": intermeds.startup,
    "speed": 10
  },
  {
    "text": "welc->\n-+=+- solcon v94.206 -+=+-\n\"your premiere thouperating system\"\nin case of emergency, immediately contact emerg@solcon.gov",
    "speed": 100
  },
  {
    "text": "{sys} how may i be of assistance?",
    "speed": 50
  }
]

var isWriting = false;

window.onload = function() {
  crt = document.getElementById("crt");
  con = document.getElementById("console");

  con.value = "";

  writeOrder(startupOrder, 0);
}

function sendInput(event) {
  if (event.keyCode == 13) {
    if (isWriting == false && !(/^\s*$/.test(con.value))) {
      crt.innerHTML += "{usr} " + con.value + "\n.\n.\n.\n";
    }

    parseInput(con.value);

    con.value = "";
  }
}

function parseInput(inp) {
  var temp = inp.toUpperCase().split(" || ");
  var commands = [];

  for (var i in temp) {
    commands[i] = temp[i].split(" ");
  }

  for (var j in commands) {
    if (commands[j][0][commands[j][0].length - 1] == "~") {
      switch (commands[j][0].substring(0, commands[j][0].length - 1)) {
          case "CONVOS":
            switch (commands[j][1]) {
              case "HELP":
                writeOut("A [action]\nC [check]\nE [exit]\nI [info]\nO [override]", 100);
                break;
            }
            break;
      }
    }
  }
}

function writeOrder(order, orderNum) {
  if (orderNum < order.length) {
    writeOut(order[orderNum].text, order[orderNum].speed);

    var temp = (order[orderNum].speed + 3) * order[orderNum].text.length;

    setTimeout(function() {
      writeOrder(order, orderNum + 1);
    }, temp);
  }
}

function writeOut(text, speed) {
  if (text.length > 0) {
    isWriting = true;

    setTimeout(function() {
      crt.innerHTML += text[0];
      writeOut(text.substring(1, text.length), speed);
    }, speed);
  }
  else {
    crt.innerHTML += "\n.\n.\n.\n";
    isWriting = false;
  }
}
