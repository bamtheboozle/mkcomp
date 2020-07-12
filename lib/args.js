const chalk = require("chalk");
const { conf, initStore } = require("./store");
const files = require("./files");
const inquirer = require("./inquirer");

module.exports = {
  create: async (argv) => {
    let componentNames = [];
    let path = "";

    if (argv._ && argv._.length) {
      componentNames = [...argv._];
    } else {
      if (argv.n || argv.name) {
        componentNames = [argv.n || argv.name];
      }
    }

    if (argv.p || argv.path) {
      path = argv.p || argv.path;
    }
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    const activeProjectName = conf.get("activeProject");
    const activeProjectData = conf.get(activeProjectName);

    if (!activeProjectData.isConfigured) {
      console.log(
        chalk.green(`Initializing config for project: ${activeProjectName}`)
      );
      await initStore(activeProjectName);
      console.log(
        chalk.green(`Project ${activeProjectName} configured successfully.`)
      );
      return;
    }

    if (!componentNames || componentNames.length === 0) {
      console.log(chalk.red("No name was given for the component."));
      return;
    }

    const { answers } = activeProjectData;

    componentNames.forEach((name) => {
      if (name.includes("/")) {
        console.log(
          chalk.red(`${name} contains an invalid character "/". Skipping...`)
        );
      } else {
        let componentPath = name;
        if (path) {
          componentPath = `${path}/${name}`;
        }

        if (files.directoryExists(componentPath)) {
          if (argv.f || argv.force) {
            files.rmdir(componentPath);
          } else {
            console.log(
              chalk.red(
                `"${componentPath}" already exists. Add -f flag to remove and overwrite`
              )
            );
            return;
          }
        }
        files.createDir(componentPath).then(() => {
          files.createFiles({
            path: componentPath,
            componentName: name,
            answers,
            skipTest: argv.skiptest,
            skipStyle: argv.skipstyle,
          });
          console.log(
            chalk.green(`${name} created successfully at ${componentPath}`)
          );
        });
      }
    });
  },
  init: async (initValue) => {
    let project = "default";
    if (typeof initValue === "string") project = initValue;
    console.log(chalk.green(`Initializing config for project: ${project}`));
    await initStore(project);
    console.log(chalk.green(`Project ${project} configured successfully.`));
    return;
  },
  list: () => {
    const availableProjects = conf.get("list");
    if (availableProjects && availableProjects.length) {
      console.log(
        chalk.green(
          `Available projects:\n${(conf.get("list") || []).join("\n")}`
        )
      );
    } else {
      console.log(
        chalk.red(
          "No available projects. Initialize a new one with mkcomp --init {name}"
        )
      );
    }
    return;
  },
  switch: async () => {
    const availableProjects = conf.get("list");
    console.log(availableProjects);
    if (availableProjects && availableProjects.length) {
      const answers = await inquirer.getProject(availableProjects);
      conf.set("activeProject", answers.project);
      console.log(chalk.green(`Switched to project config ${answers.project}`));
    } else {
      console.log(
        chalk.red(
          "No available projects. Initialize a new one with mkcomp --init {name}"
        )
      );
    }
    return;
  },
};
