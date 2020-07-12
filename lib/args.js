const args = require("minimist")(process.argv.slice(2));

module.exports = {
  extractArgs: () => {
    const extractedArgs = {};

    if (args._ && args._.length === 2) {
      return {
        name: args._[0],
        path: args._[1],
      };
    } else {
      if (args.n || args.name) {
        extractedArgs.name = args.n || args.name;
      }
      if (args.p || args.path) {
        extractedArgs.path = args.p || args.path;
      }
    }

    return { ...args, ...extractedArgs };
  },
};
