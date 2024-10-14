import { Transform } from 'node:stream';

import {printCurrentDirectory, upDirectory, setCurrentPath} from '../directory/directory.js';

const COMMAND_DELIMITER = ' ';
const COMMAND_INDEX = 0;

class Controller extends Transform {
  constructor() {
    super();
  }

  async _transform(chunk, _, callback) {
    let command;
    try {
      const chunkNormalizedString = chunk.toString('utf8').trim();
      const commandArgs = chunkNormalizedString.split(COMMAND_DELIMITER);
      command = commandArgs[COMMAND_INDEX];

      switch (command) {
        case '.exit': 
          process.exit();
          break;
        case 'up':
          await upDirectory();
          printCurrentDirectory();
          break;
        case 'cd': 
          await setCurrentPath(commandArgs[1]);
          printCurrentDirectory();
          break;
      }
    } catch(error) {
      console.log(error.message);
    } finally {
      callback(null, chunk);
    }
  }
};

export const controller = new Controller();