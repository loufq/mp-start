//
var parse = require('./parse.js');
var search1 = function(input, callback) {
    console.log(input);
    parse(input, callback);
};

module.exports.search = search1;