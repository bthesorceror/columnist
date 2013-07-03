function mergeOptions(options) {
  var defaults = { ignore_first: false,
                    ignore_last: false,
                  remove_quotes: true }
  options = options || {};
  Object.keys(defaults).forEach(function(key) {
    if (options[key] === undefined) {
      options[key] = defaults[key];
    }
  });
  return options;
}
function Columnist(columns, options) {
  options           = mergeOptions(options);
  this.columns      = columns;
  this.ignoreFirst  = options['ignore_first'];
  this.ignoreLast   = options['ignore_last'];
  this.removeQuotes = options['remove_quotes'];
}

Columnist.prototype.convert = function(val) {
  if (this.isFloat(val)) {
    return parseFloat(val);
  } else if (this.isInt(val)) {
    return parseInt(val);
  } else {
    return val;
  }
}

Columnist.prototype.isFloat = function(val) {
  return val != '' && val.match(/^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/);
}

Columnist.prototype.isInt = function(val) {
  return val.match(/^(?:-?(?:0|[1-9][0-9]*))$/);
}

Columnist.prototype.sanitize = function(text) {
  var result = text.replace(/\r/g, "");
  if (this.removeQuotes) { result = result.replace(/"/g, ""); }
  return result;
}

Columnist.prototype.processLine = function(line) {
  var items  = line.split(','),
      result = {},
      self   = this;

  this.columns.forEach(function(column, index) {
    result[column] = self.convert(items[index]);
  });

  return result;
}

Columnist.prototype.shouldIgnore = function(index, lines) {
  return (index == 0 && this.ignoreFirst) || index == (lines.length - 1);
}

Columnist.prototype.parse = function(text) {
  var results = [],
      self    = this,
      lines   = self.sanitize(text).split('\n');

  lines.forEach(function(line, index) {
    if (self.shouldIgnore(index, lines)) return;
    results.unshift(self.processLine(line));
  });

  return results;
}

module.exports = Columnist;
