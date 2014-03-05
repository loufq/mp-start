var _ = require('underscore')._;
var maizs = require('./../maizs/index.js');
/**
 * 初始化路由规则
 */
module.exports = exports = function(webot) {
    //subscribe=====================================================
    webot.set({
        name: 'subscribe',
        description: 'subscribe',
        pattern: function(info) {
            return info.is('event') && info.param.event === 'subscribe';
        },
        handler: function(info, next) {
            var reply = '欢迎关注..';
            return next(null, reply);
        }
    });
    //unsubscribe=====================================================
    webot.set({
        name: 'unsubscribe',
        description: 'unsubscribe',
        pattern: function(info) {
            return info.is('event') && info.param.event === 'unsubscribe';
        },
        handler: function(info, next) {
            var reply = 'Bye';
            return next(null, reply);
        }
    });
    //Common============================================================
    webot.set({
        name: 'Common',
        description: 'Common',
        pattern: function(info) {
            return /^.*$/i.test(info.text);
        },
        handler: function(info, next) {
            var keyword = info.text;
            var reply = keyword;
            return next(null, reply);
        }
    });
};