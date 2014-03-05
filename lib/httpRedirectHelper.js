var http = require('follow-redirects').http;

var querystring = require('querystring');
var url = require('url');
var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite'); //用于转码 

var _ = require('underscore');
var tempEncode = '';

function Request(urlString, options, callback) {
    if (!url) {
        throw new Error('URL must in mandatory to initialize Request object');
    }
    this.urlString = urlString;
    this.encode = options.encode || 'utf-8';
    this.method = options.method || 'GET';
    this.body = options.body || {};
    this.params = options.params || {};
    this.path = options.path || null;
    this.headers = options.headers || {};
    this.dataType = (options.dataType === undefined) ? 'json' : options.dataType;
    this.auth = options.auth || {};
    this.cache = options.cache || {
        cache: false,
        expires: 3600
    };
    this.timeout = options.timeout || 30000;
    this.cookie = options.cookie;
    this.host = url.parse(urlString).hostname;
    tempEncode = this.encode;
    // this.cookies(options.cookies);
    var content = querystring.stringify(this.params);
    if (content.length == 0) {
        content = querystring.stringify(this.body);
    };
    var options = {
        host: url.parse(urlString).hostname,
        port: url.parse(urlString).port,
        path: url.parse(urlString).path,
        method: this.method,
        headers: {
            'Cookie': this.cookie,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        }
    };

    var req = http.request(options, function(res) {
        // console.log('this.encode:' + tempEncode);
        // console.log(tempEncode);
        //console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);
        var bufferHelper = new BufferHelper();
        res.on('data', function(chunk) {
            bufferHelper.concat(chunk);
        });
        res.on('end', function() {
            if (tempEncode != 'utf-8') {
                var html = bufferHelper.toBuffer();
                var tex = iconv.decode(bufferHelper.toBuffer(), tempEncode);
                //console.log("\n--->>\nresult:",_data)
                callback(null, tex);
            } else {
                callback(null, bufferHelper.toBuffer().toString());
            }

        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        callback(e);
    });

    req.write(content);
    req.end();
}

module.exports = Request;