const fs = require("fs");
const mkdirp = require("mkdirp");
const touch = require("touch");
const { ANSWERS } = require("./inquirer");

const createComponentFile = (path) => {
  touch(path);
};

const createTestFile = (path, type, extension) => {
  if (type === ANSWERS.test.component) {
    touch(`${path}.test${extension}`);
  } else if (type === ANSWERS.test.__tests__) {
    const path = "src/__tests__";
    if (fs.existsSync(path)) {
      touch(`${path}/${componentName}.test${extension}`);
    } else {
      mkdirp(path).then(() => {
        touch(`${path}/${componentName}.test${extension}`);
      });
    }
  }
};

const createStyleFile = (path, type, extension) => {
  switch (type) {
    case ANSWERS.style.sassModule: {
      touch(`${path}.module.scss`);
      break;
    }
    case ANSWERS.style.sass: {
      touch(`${path}.scss`);
      break;
    }
    case ANSWERS.style.css: {
      touch(`${path}.css`);
      break;
    }
    case ANSWERS.style.jsincss: {
      touch(`${path}.styles.${extension}`);
      break;
    }
  }
};

createIndexFile = (path, extension) => {
  touch(`${path}/index.${extension}`);
};

module.exports = {
  createDir: mkdirp,
  rmdir: (path) => fs.rmdirSync(path, { recursive: true }),
  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },
  createFiles: ({ path, componentName, answers, skipTest, skipStyle }) => {
    const componentPath = `${path}/${componentName}`;
    const extension = answers.flavor === ANSWERS.flavor.js ? "js" : "ts";

    createComponentFile(`${componentPath}${answers.componentExtension}`);

    if (answers.test !== ANSWERS.test.no && !skipTest)
      createTestFile(componentPath, answers.test, answers.testExtension);

    if (answers.style !== ANSWERS.style.no && !skipStyle)
      createStyleFile(componentPath, answers.style, extension);

    if (answers.index === ANSWERS.index.yes) createIndexFile(path, extension);
  },
};
