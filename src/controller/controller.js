import { Transform } from 'node:stream';

import { directoryController } from '../directory/directory.controller.js';
import { parseUserCliCommand } from '../cli-parser/cli-parser.js';
import { readFileToConsole, createFile, renameFile, copyFile, deleteFile, moveFile } from '../fs-operations/index.js';
import { hashCalc } from '../hash/hash.js';
import { compress } from '../archive/compress.js';
import { decompress } from '../archive/decompress.js';

const COMMANDS = {
  EXIT: '.exit',
  DIR: {
    UP: 'up',
    CHANGE: 'cd',
    LIST: 'ls'
  },
  FILE: {
    READ: 'cat',
    CREATE: 'add',
    RENAME: 'rn',
    COPY: 'cp',
    DELETE: 'rm',
    MOVE: 'mv'
  }, 
  HASH: 'hash',
  COMPRESS: 'compress',
  DECOMPRESS: 'decompress'
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
        case COMMANDS.DIR.UP:
          await directoryController.upDirectory();
          break;
        case COMMANDS.DIR.CHANGE:
          await directoryController.setNewCurrentDirectory(firstArg);
          break;
        case COMMANDS.DIR.LIST:
          await directoryController.listSortedDirectory();
          break;
        case COMMANDS.FILE.READ:
          await readFileToConsole(firstArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.FILE.CREATE:
          await createFile(firstArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.FILE.RENAME:
          await renameFile(firstArg, secondArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.FILE.COPY:
          await copyFile(firstArg, secondArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.FILE.DELETE:
          await deleteFile(firstArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.FILE.MOVE:
          await moveFile(firstArg, secondArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.HASH:
          await hashCalc(firstArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.COMPRESS:
          await compress(firstArg, secondArg, directoryController.getCurrentDirectory());
          break;
        case COMMANDS.DECOMPRESS:
          await decompress(firstArg, secondArg, directoryController.getCurrentDirectory());
          break;
      }
    } catch(error) {
      console.error(error);
    } finally {
      directoryController.printCurrentDirectory();
      callback(null, chunk);
    }
  }
};

export const controller = new Controller();