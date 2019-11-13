var fs = require("fs");

fs.readFile("temp.txt", function(err, buf) {
  console.log(buf.toString());
});
