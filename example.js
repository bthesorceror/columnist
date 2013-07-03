var Columnist = require('./index');
var data = require('fs').readFileSync('./test.csv', 'utf8');

var columnist = new Columnist(['first', 'last', 'age', 'gpa'], { /* options */ });

console.log(columnist.parse(data));
