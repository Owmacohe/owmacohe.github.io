var fs = require("fs");
var http = require("http");

function readWrite(request) {
  if (request.method == "GET") {
    fs.readFile("test.txt", "utf-8", (err, output) => {
    console.log(output);
    });
  }
  else if (request.method == "POST") {
    fs.writeFile("test.txt", "FILE CONTENTS", (err) => {
    console.log("WRITTEN");
    });
  }
}
