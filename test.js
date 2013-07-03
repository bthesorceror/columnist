var tape      = require('tape'),
    fs        = require('fs'),
    Columnist = require('./index');

var fixture = fs.readFileSync('./test.csv', 'utf8');

tape("parses correctly", function(t) {
  t.plan(4);

  var columnist = new Columnist(['first', 'last', 'age', 'gpa']);

  var person = columnist.parse(fixture)[0];

  t.equals(person.first, 'bran"do"n');
  t.equals(person.last, "farmer's");
  t.equals(person.age, 30);
  t.equals(person.gpa, 3.5);
});

tape("parses all lines", function(t) {
  t.plan(4);

  var columnist = new Columnist(['first', 'last', 'age', 'gpa']);

  var people = columnist.parse(fixture);
  var person = people.pop();

  t.equals(person.first, 'tom');
  t.equals(person.last, 'jones');
  t.equals(person.age, 65);
  t.equals(person.gpa, 2.5);
});

tape("skips first by option", function(t) {
  t.plan(4);

  var columnist = new Columnist(['first', 'last', 'age', 'gpa'], {ignore_first: true});

  var people = columnist.parse(fixture);
  var person = people[0];

  t.equals(person.first, 'john');
  t.equals(person.last, 'smith');
  t.equals(person.age, 45);
  t.equals(person.gpa, 4.0);
});

tape("skips last by option", function(t) {
  t.plan(4);

  var columnist = new Columnist(['first', 'last', 'age', 'gpa'], {ignore_last: true});

  var people = columnist.parse(fixture);
  var person = people.pop();

  t.equals(person.first, 'john');
  t.equals(person.last, 'smith');
  t.equals(person.age, 45);
  t.equals(person.gpa, 4.0);
});

tape("leaves quotes by option", function(t) {
  t.plan(4);

  var columnist = new Columnist(['first', 'last', 'age', 'gpa'], {remove_quotes: false});

  var person = columnist.parse(fixture)[0];

  t.equals(person.first, '"bran"do"n"');
  t.equals(person.last, "'farmer's'");
  t.equals(person.age, 30);
  t.equals(person.gpa, 3.5);
});
