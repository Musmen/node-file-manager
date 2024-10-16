import path from 'node:path';

import { getSortedDirContent } from './utils/sortDir.js';
import { listDirectory } from './utils/listDir.js';

import { checkIsDirectory } from '../../common/helpers/helper.js';
import { getDirectoryContent, getAbsolutePath } from './helpers/directory.helper.js';

const CURRENT_DIRECTORY_PREFIX = 'You are currently in';

export class DirectoryController {
  currentDirectory = process.env.HOME;

  getCurrentDirectory = () => this.currentDirectory;

  setNewCurrentDirectory = async (newPath) => {
    const absoluteNewPath = getAbsolutePath(newPath, this.currentDirectory);
    await checkIsDirectory(absoluteNewPath);
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