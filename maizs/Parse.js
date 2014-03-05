var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var async = require('async');
var querystring = require('querystring');
var helper = require('./../lib/httpHelper.js');
var parse = function(keyword, callback) {
    var queryWord = keyword.trim();
}

module.exports.parse = parse;