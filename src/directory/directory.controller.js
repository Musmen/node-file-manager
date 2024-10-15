import path from 'node:path';
import { stat as fsPromisesStat } from 'node:fs/promises';

import { getSortedDirContent } from './utils/sortDir.js';
import { listDirectory } from './utils/listDir.js';

import { getDirectoryContent, getAbsolutePath } from './helpers/directory.helper.js';
import { ERRORS_MESSAGES } from '../constants/constants.js';

const CURRENT_DIRECTORY_PREFIX = 'You are currently in';

export class DirectoryController {
  currentDirectory = process.env.HOME;

  getCurrentDirectory = () => this.currentDirectory;

  setNewCurrentDirectory = async (newPath) => {
    const absoluteNewPath = getAbsolutePath(newPath, this.currentDirectory);
    if (!(await fsPromisesStat(absoluteNewPath)).isDirectory()) throw new Error(ERRORS_MESSAGES.OPERATION);
    this.currentDirectory = absoluteNewPath;
  }

  upDirectory = async () => await setNewCurrentDirectory(path.dirname(this.currentDirectory));

  printCurrentDirectory = () => console.log(`${CURRENT_DIRECTORY_PREFIX} ${this.currentDirectory}`);

  listSortedDirectory = async (dirPath = this.currentDirectory) => {
    const dirContent = await getDirectoryContent(dirPath);
    const sortedDirContent = getSortedDirContent(dirContent);
    listDirectory(sortedDirContent);
  }
}

export const directoryController = new DirectoryController();