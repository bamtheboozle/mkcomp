const inquirer = require("inquirer");

const ANSWERS = {
  flavor: {
    ts: "Typescript",
    js: "Javascript",
  },
  componentExtension: {
    tsx: ".tsx",
    jsx: ".jsx",
    ts: ".ts",
    js: ".js",
  },
  test: {
    component: "In the component folder",
    __tests__: "In src/__tests__ folder",
    no: "Don't generate test files",
  },
  style: {
    sassModule: "CSS Modules (.module.scss)",
    jsincss: "Styles.js (.styles.{js,ts})",
    css: "Css (.css)",
    sass: "Sass (.scss)",
    no: "Don't generate styles file",
  },
  index: {
    yes: "yes",
    no: "no",
  },
};
module.exports = {
  ANSWERS,
  getPreferences: () => {
    const questions = [
      {
        name: "flavor",
        type: "list",
        message:
          "What language is the project written in? (will be used for file extensions)",
        choices: [ANSWERS.flavor.ts, ANSWERS.flavor.js],
      },
      {
        name: "componentExtension",
        type: "list",
        message: "What is your preferred file extension for React Components?",
        choices: (answers) => {
          if (answers.flavor === ANSWERS.flavor.js) {
            return [
              ANSWERS.componentExtension.jsx,
              ANSWERS.componentExtension.js,
            ];
          } else {
            return [
              ANSWERS.componentExtension.tsx,
              ANSWERS.componentExtension.ts,
            ];
          }
        },
      },
      {
        name: "test",
        type: "list",
        message: "Where should the component's test files be generated?",
        choices: [
          ANSWERS.test.component,
          ANSWERS.test.__tests__,
          ANSWERS.test.no,
        ],
      },
      {
        name: "testExtension",
        type: "list",
        message:
          "What is your preferred file extension for the unit tests of the Component?",
        choices: [
          ANSWERS.componentExtension.tsx,
          ANSWERS.componentExtension.jsx,
          ANSWERS.componentExtension.ts,
          ANSWERS.componentExtension.js,
        ],
      },
      {
        name: "style",
        type: "list",
        message: "What format should the style file have?",
        choices: [
          ANSWERS.style.sassModule,
          ANSWERS.style.sass,
          ANSWERS.style.css,
          ANSWERS.style.jsincss,
          ANSWERS.style.no,
        ],
      },
      {
        name: "index",
        type: "list",
        message: "Do you want an index file to be generated?",
        choices: [ANSWERS.index.yes, ANSWERS.index.no],
      },
    ];
    return inquirer.prompt(questions);
  },
  getProject: (projects) => {
    const question = {
      name: "project",
      type: "list",
      message: "What project config do you wish to use?",
      choices: projects,
    };
    return inquirer.prompt(question);
  },
};
