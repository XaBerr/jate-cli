#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');
var exec = require('child_process').exec;
var copyfiles = require('copyfiles');
var path = require('path');
var ncp = require('ncp').ncp;
var mkdirp = require('mkdirp');
var currentPath = process.cwd();
var fs = require('fs');

program
.version('0.0.1', '-v, --version')
.arguments('<project>')
.action(function(project) {
  console.log(chalk.green('PROJECT: '+currentPath+"/"+project));
  if (fs.existsSync(currentPath+"/"+project)) {
    console.error(chalk.red("Project already exist."));
    return;
  }
  mkdirp(currentPath+'/'+project, function (err) {
    if (err instanceof Error && err !== null) {
      console.error(chalk.red(err.message));
    } else {
      console.log(chalk.green('STEP 1: Created project folder'));
      process.chdir(currentPath+"/"+project);
      console.log(chalk.green('STEP 2: Changed dir'));
      exec('git clone https://github.com/XaBerr/JATE.git', function(err, out, code) {
        if (err instanceof Error && err !== null) {
          console.error(chalk.red(err.message));
        } else {
          console.log(chalk.green('STEP 3: Downloaded JATE'));
          ncp(currentPath+"/"+project+"/JATE/examples/01essential", currentPath+"/"+project, function (err) {
            if (err instanceof Error && err !== null) {
              console.error(chalk.red(err.message));
            } else {
              console.log(chalk.green('STEP 4: Init files'));
              console.log(chalk.green('Done!'));
            }
          });
        }
      });
    }
  });
})
.parse(process.argv);
