var fs = require('fs');

fs.writeFile('/Users/ohellum/Documents/GitHub/owmacohe.github.io/Final\ Website/TestFile.txt', 'TEXT', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
