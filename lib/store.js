const inquirer = require("./inquirer");
const Configstore = require("configstore");
const conf = new Configstore("mkcomp");

module.exports = {
  conf,
  initStore: async (project) => {
    const answers = await inquirer.getPreferences();
    conf.set("activeProject", project);
    conf.set(`${project}.answers`, answers);
    conf.set(`${project}.isConfigured`, true);

    const projects = conf.get("list");
    if (projects && projects.length) {
      conf.set("list", [...projects, project]);
    } else {
      conf.set("list", [project]);
    }
    return answers;
  },
};
