const inquirer = require("./inquirer");
const Configstore = require("configstore");
const conf = new Configstore("mkcomp");

module.exports = {
  conf,
  initStore: async () => {
    const answers = await inquirer.getPreferences();
    conf.set("answers", answers);
    conf.set("isConfigured", true);
    return answers;
  },
};
