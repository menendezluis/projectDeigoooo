//const parseArgs = require('minimist');
import parseArgs from 'minimist';

const options = {
  default: {
    environment: 'dev'
  },
  alias: {
    e: 'environment'
  }
};

const args = parseArgs(process.argv.slice(2), options);

console.log(args);