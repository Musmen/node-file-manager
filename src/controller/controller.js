import { Transform } from 'node:stream';

import { printCurrentDirectory, upDirectory, setCurrentDirectory, listSortedDir } from '../directory/directory.js';

const COMMAND_DELIMITER = ' ';
const COMMAND_INDEX = 0;
const FIRST_ARGS_INDEX = 1;

const COMMANDS = {
  EXIT: '.exit',
  UP_DIR: 'up',
  CHANGE_DIR: 'cd',
  LIST_DIR: 'ls',
}

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
        case COMMANDS.EXIT: 
          process.exit();
          break;
        case COMMANDS.UP_DIR:
          await upDirectory();
          printCurrentDirectory();
          break;
        case COMMANDS.CHANGE_DIR: 
          await setCurrentDirectory(commandArgs[FIRST_ARGS_INDEX]);
          printCurrentDirectory();
          break;
        case COMMANDS.LIST_DIR: 
          await listSortedDir();
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