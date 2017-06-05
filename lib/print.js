'use strict';

var chalk = require('chalk');

exports.iciba = function(data) {
    console.log();
    console.log('iciba');
    console.log(data);
}

exports.youdao = function(data) {
    // word
    var firstLine = data.query;

    // phonetic symbol
    if (data.basic && data.basic.phonetic) {
        firstLine += chalk.magenta(' [' + data.basic.phonetic + ']');
    }

    log(firstLine + chalk.gray(' ~  youdao.com'));

    // pos & acceptation
    if (data.basic && data.basic.explains) {
        log();
        data.basic.explains.forEach(function(item) {
            log(chalk.gray('- ') + chalk.green(item));
        });
    }

    // sentence
    if (data.web && data.web.length) {
        log();
        data.web.forEach(function(item, i) {
            log(chalk.gray(i + 1 + '. ') + highlight(item.key, data.query));
            log('   ' + chalk.cyan(item.value.join(',')));
        });
    }

    log();
}

function log(message, indentNum) {
    indentNum = indentNum || 1;
    var indent = '';
    for (var i = 1; i < indentNum; i++) {
        indent += '  ';
    }
    console.log(indent, message || '');
}

function highlight(string, key, defaultColor) {
    defaultColor = defaultColor || 'gray';
    string = string.replace(new RegExp('(.*)(' + key + ')(.*)', 'gi'), '$1$2' + chalk[defaultColor]('$3'));
    return string.replace(new RegExp('(.*?)(' + key + ')', 'gi'), chalk[defaultColor]('$1') + chalk.yellow('$2'));
}
