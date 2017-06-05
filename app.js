'use strict';
const request = require('request');
const md5 = require('md5');
const SERVER = require('./config/server');
const PRINT = require('./lib/print');

module.exports = function(word) {

    
    const salt = new Date().getTime();
    const sign = md5(SERVER.youdao.appKey + word + salt+ SERVER.youdao.appSecret);

    // youdao
    request.get(SERVER.youdao.url.replace('${word}', encodeURIComponent(word))
        .replace('${appKey}', SERVER.youdao.appKey)
        .replace('${salt}', salt)
        .replace('${sign}', sign),

        function(error, response, body) {
        	
            if (!error && response.statusCode == 200) {

                PRINT.youdao(JSON.parse(body));
            }
        });

}
