#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));

const { conf } = require("./lib/store");
const argsHandler = require("./lib/args");

const main = async () => {
  // handle init
  if (argv.init || argv.i) {
    return argsHandler.init(argv.init || argv.i);
  }

  // handle list projects
  if (argv.list || argv.lp) {
    return argsHandler.list();
  }

  // handle switch between project configs
  if (argv.switch || argv.sw) {
    return argsHandler.switch();
  }

  // clear all configs
  if (argv.clear) {
    return conf.clear();
  }

  // default, create components
  return argsHandler.create(argv);
};

main();
