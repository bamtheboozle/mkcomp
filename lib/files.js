const fs = require("fs");
const mkdirp = require("mkdirp");
const touch = require("touch");
const { ANSWERS } = require("./inquirer");

module.exports = {
  createDir: mkdirp,
  rmdir: (path) => fs.rmdirSync(path, { recursive: true }),
  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },
  createFiles: ({ path, componentName, answers }) => {
    let componentPath = `${path}/${componentName}`;
    const extension = answers.flavor === ANSWERS.flavor.js ? "js" : "ts";

    touch(`${componentPath}${answers.componentExtension}`);

    switch (answers.test) {
      case ANSWERS.test.component: {
        touch(`${componentPath}.test${answers.testExtension}`);
        break;
      }
      case ANSWERS.test.__tests__: {
        const path = "src/__tests__";
        if (fs.existsSync(path)) {
          touch(`${path}/${componentName}.test${answers.testExtension}`);
        } else {
          mkdirp(path).then(() => {
            touch(`${path}/${componentName}.test${answers.testExtension}`);
          });
        }
        break;
      }
    }

    switch (answers.style) {
      case ANSWERS.style.sassModule: {
        touch(`${componentPath}.module.scss`);
        break;
      }
      case ANSWERS.style.sass: {
        touch(`${componentPath}.scss`);
        break;
      }
      case ANSWERS.style.css: {
        touch(`${componentPath}.css`);
        break;
      }
      case ANSWERS.style.jsincss: {
        touch(`${componentPath}.styles.${extension}`);
        break;
      }
    }

    if (answers.index === ANSWERS.index.yes) {
      touch(`${path}/index.${extension}`);
    }
  },
};
