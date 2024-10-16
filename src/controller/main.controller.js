import { Transform } from 'node:stream';

import { directoryController } from '../modules/directory/directory.controller.js';
import { parseUserCliCommand } from '../modules/cli-parser/cli-parser.js';
import { readFileToConsole, createFile, renameFile, copyFile, deleteFile, moveFile } from '../modules/fs-operations/index.js';
import { hashCalc } from '../modules/hash/hash.js';
import { compress } from '../modules/archive/compress.js';
import { decompress } from '../modules/archive/decompress.js';
import { osController } from '../modules/os/os.controller.js';

import { ERRORS_MESSAGES } from '../common/constants/constants.js';

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
  DECOMPRESS: 'decompress',
  OS: 'os'
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
        case COMMANDS.OS:
          await osController(firstArg);
          break;
        default:
          console.error(ERRORS_MESSAGES.INPUT);
      }
    } catch {
      console.error(ERRORS_MESSAGES.OPERATION);
    } finally {
      directoryController.printCurrentDirectory();
      callback(null, chunk);
    }
  }
};

export const controller = new Controller();