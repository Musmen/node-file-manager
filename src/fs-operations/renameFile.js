import path from 'node:path';
import { rename as fsPromisesRename } from 'node:fs/promises';

import { getAbsolutePath, checkFileName } from '../helpers/helper.js';

export const renameFile = async (filePath, newFileName, currentDirectory) => {
  checkFileName(newFileName);
  const absoluteFilePath = getAbsolutePath(filePath, currentDirectory);
  const newFilePath = path.join(path.dirname(absoluteFilePath), newFileName);
  await fsPromisesRename(absoluteFilePath, newFilePath);
}