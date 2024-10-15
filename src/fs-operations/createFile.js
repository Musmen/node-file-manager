import path from 'node:path';
import { open as fsPromisesOpen } from 'node:fs/promises';

import { ERRORS_MESSAGES } from '../constants/constants.js';

export const createFile = async (fileName, currentDirectory) => {
  const baseFileName = path.parse(fileName).base;
  if (baseFileName !== fileName) throw new Error(ERRORS_MESSAGES.INPUT);

  const filePath = path.join(currentDirectory, path.parse(fileName).base);
  const fd = await fsPromisesOpen(filePath, 'w');
  fd.close();
}