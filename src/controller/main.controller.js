import { Transform } from 'node:stream';

import { directoryController } from '../modules/directory/directory.controller.js';
import { parseUserCliCommand } from '../modules/cli-parser/cli-parser.js';
import { readFileToConsole, createFile, renameFile, copyFile, deleteFile, moveFile } from '../modules/fs-operations/index.js';
import { hashCalc } from '../modules/hash/hash.js';
import { compress } from '../modules/archive/compress.js';
import { decompress } from '../modules/archive/decompress.js';
import { osController } from '../modules/os/os.controller.js';

import { ERRORS_MESSAGES } from '../common/constants/constants.js';
import { COMMANDS } from './constants/commands.js';

class Controller extends Transform {
  constructor() {
    super();
  }

  async _transform(chunk, _, callback) {
    try {
      const { command, firstArg, secondArg } = parseUserCliCommand(chunk);
      const currentDirectory = directoryController.getCurrentDirectory();

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
          await readFileToConsole(firstArg, currentDirectory);
          break;
        case COMMANDS.FILE.CREATE:
          await createFile(firstArg, currentDirectory);
          break;
        case COMMANDS.FILE.RENAME:
          await renameFile(firstArg, secondArg, currentDirectory);
          break;
        case COMMANDS.FILE.COPY:
          await copyFile(firstArg, secondArg, currentDirectory);
          break;
        case COMMANDS.FILE.DELETE:
          await deleteFile(firstArg, currentDirectory);
          break;
        case COMMANDS.FILE.MOVE:
          await moveFile(firstArg, secondArg, currentDirectory);
          break;
        case COMMANDS.HASH:
          await hashCalc(firstArg, currentDirectory);
          break;
        case COMMANDS.COMPRESS:
          await compress(firstArg, secondArg, currentDirectory);
          break;
        case COMMANDS.DECOMPRESS:
          await decompress(firstArg, secondArg, currentDirectory);
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