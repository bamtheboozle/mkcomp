#!/usr/bin/env node
const files = require("./lib/files");
const chalk = require("chalk");
const { conf, initStore } = require("./lib/store");
const { extractArgs } = require("./lib/args");

const main = async () => {
  const args = extractArgs();

  if (!conf.get("isConfigured") || args.init) {
    await initStore();
    if (args.init) return;
  }

  if (!args.name || args.name === "") {
    console.log(chalk.red("No name was given for the component."));
    return;
  }
  const answers = conf.get("answers");

  let path = args.name;
  if (args.path) {
    path = `${args.path}/${args.name}`;
  }
  if (files.directoryExists(path)) {
    files.rmdir(path);
  }
  files.createDir(path).then(() => {
    files.createFiles({
      path,
      componentName: args.name,
      answers,
    });
    console.log(
      chalk.green(`${args.name} created successfully at ${args.path}.`)
    );
  });
};

main();
