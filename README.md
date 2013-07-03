Columnist
==========

[![Build Status](https://travis-ci.org/bthesorceror/columnist.png?branch=master)](https://travis-ci.org/bthesorceror/columnist)

A node module for parsing out csv documents to an array of object literals as
well as attempts to parse data into the numbers when possible

Example
---------

test.csv

```
"brandon", 'farmer', 30, 3.5
john, smith, 45, 4.0
tom, jones, 65, 2.5
```

JS file

```javascript

var Columnist = require('columnist');
var data = require('fs').readFileSync('./test.csv', 'utf8');

var columnist = new Columnist(['first', 'last', 'age', 'gpa'], { /* options */ });

console.log(columnist.parse(data));

```

This example will result in the following array.

```javascript

[ { first: 'brandon', last: 'farmer', age: 30, gpa: 3.5 },
  { first: 'john', last: 'smith', age: 45, gpa: 4 },
  { first: 'tom', last: 'jones', age: 65, gpa: 2.5 } ]

```

Options
-------

* ignore_first  -- (default: false) will ignore the first line of the document
* ignore_last   -- (default: false) will ignore the last line of the document
* remove_quotes -- (default: true) remove quotes from document
