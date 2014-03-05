/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var path = require('path');
var webot = require('weixin-robot');
var _ = require('underscore');

var appConfig = require('./config');

var app = express();
app.use(express.query());

// all environments
app.set('port', process.env.PORT || appConfig['app_port']);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());

console.log(appConfig['mp_token']);
console.log(appConfig['mp_path']);

webot.watch(app, {
    token: appConfig['mp_token'],
    path: appConfig['mp_path']
});

require('./rules')(webot);

// development onlyasdf
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
routes(app);
app.listen(app.get('port'), function() {
    console.log(appConfig['app_name'] + ' server listening on port ' + app.get('port'));
});