const inquirer = require("inquirer");

const ANSWERS = {
  flavor: {
    js: "Javascript",
    ts: "Typescript",
  },
  componentExtension: {
    js: ".js",
    ts: ".ts",
    jsx: ".jsx",
    tsx: ".tsx",
  },
  test: {
    component: "In component folder",
    __tests__: "In __tests__ folder",
    no: "Don't generate test file",
  },
  style: {
    css: ".css",
    sass: ".scss",
    sassModule: ".module.scss",
    jsincss: ".styles.{js,ts}",
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
        message: "Choose your language (will be used for file extensions)",
        choices: [ANSWERS.flavor.js, ANSWERS.flavor.ts],
      },
      {
        name: "componentExtension",
        type: "list",
        message: "Choose the extension you use for React components",
        choices: (answers) => {
          if (answers.flavor === ANSWERS.flavor.js) {
            return [
              ANSWERS.componentExtension.js,
              ANSWERS.componentExtension.jsx,
            ];
          } else {
            return [
              ANSWERS.componentExtension.ts,
              ANSWERS.componentExtension.tsx,
            ];
          }
        },
      },
      {
        name: "test",
        type: "list",
        message: "How should we generate test files?",
        choices: [
          ANSWERS.test.component,
          ANSWERS.test.__tests__,
          ANSWERS.test.no,
        ],
      },
      {
        name: "testExtension",
        type: "list",
        message: "Choose the default extension for test files",
        choices: [
          ANSWERS.componentExtension.js,
          ANSWERS.componentExtension.jsx,
          ANSWERS.componentExtension.ts,
          ANSWERS.componentExtension.tsx,
        ],
      },
      {
        name: "style",
        type: "list",
        message: "How should we generate styles files?",
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
        message: "Do you want to generate an index file?",
        choices: [ANSWERS.index.yes, ANSWERS.index.no],
      },
    ];
    return inquirer.prompt(questions);
  },
};
