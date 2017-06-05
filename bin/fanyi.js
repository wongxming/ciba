#!/usr/bin/env node

var chalk = require('chalk');
var app = require('../package');
if (!process.argv[2]) {
  console.log('  ' + chalk.red(app.name)+chalk.gray(' v' + app.version));
  console.log('  ' + chalk.gray(app.description));
  console.log('  $ ' + chalk.cyan('[fy|fanyi] word'));

  return;
}

console.log();

var fanyi = require('../app');
fanyi(process.argv.slice(2).join(' '));
