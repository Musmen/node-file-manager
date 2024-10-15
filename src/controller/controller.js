import { Transform } from 'node:stream';

import { directoryController } from '../directory/directory.controller.js';
import { parseUserCliCommand } from '../cli-parser/cli-parser.js';
import { readFileToConsole, createFile, renameFile, copyFile } from '../fs-operations/index.js';

const COMMANDS = {
  EXIT: '.exit',
  UP_DIR: 'up',
  CHANGE_DIR: 'cd',
  LIST_DIR: 'ls',
  READ_FILE: 'cat',
  CREATE_FILE: 'add',
  RENAME_FILE: 'rn',
  COPY_FILE: 'cp',
}

class Controller extends Transform {
  constructor() {
    super();
  }

  async _transform(chunk, _, callback) {
    try {
      const { command, firstArg, secondArg } = parseUserCliCommand(chunk);

      switch (command) {
        case COMMANDS.EXIT:
          process.exit();
          break;
        case COMMANDS.UP_DIR:
          await directoryController.upDirectory();
          break;
        case COMMANDS.CHANGE_DIR:
          await directoryController.setNewCurrentDirectory(firstArg);
          break;
        case COMMANDS.LIST_DIR:
          await directoryController.listSortedDirectory();
          break;
        case COMMANDS.READ_FILE:
          await readFileToConsole(firstArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.CREATE_FILE:
          await createFile(firstArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.RENAME_FILE:
          await renameFile(firstArg, secondArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.COPY_FILE:
          await copyFile(firstArg, secondArg, directoryController.getCurrentDirectory());
          break;
      }
    } catch(error) {
      console.error(error.message);
    } finally {
      directoryController.printCurrentDirectory();
      callback(null, chunk);
    }
  }
};

export const controller = new Controller();