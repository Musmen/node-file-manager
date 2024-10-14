import { Transform } from 'node:stream';

import { printCurrentDirectory, upDirectory, setCurrentDirectory, listSortedDir } from '../directory/directory.js';
import { parseUserCliCommand } from '../cli-parser/cli-parser.js';

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
    try {
      const { command, argument } = parseUserCliCommand(chunk);

      switch (command) {
        case COMMANDS.EXIT: 
          process.exit();
          break;
        case COMMANDS.UP_DIR:
          await upDirectory();
          break;
        case COMMANDS.CHANGE_DIR: 
          await setCurrentDirectory(argument);
          break;
        case COMMANDS.LIST_DIR: 
          await listSortedDir();
          break;
      }
    } catch(error) {
      console.log(error.message);
    } finally {
      printCurrentDirectory();
      callback(null, chunk);
    }
  }
};

export const controller = new Controller();