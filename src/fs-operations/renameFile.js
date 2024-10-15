import path from 'node:path';
import { rename as fsPromisesRename } from 'node:fs/promises';

import { getAbsoluteNewPath, checkFileName } from '../helpers/helper.js';

export const renameFile = async (filePath, newFileName, currentDirectory) => {
  checkFileName(newFileName);
  const absoluteFilePath = await getAbsoluteNewPath(filePath, currentDirectory);
  const newFilePath = path.join(path.dirname(absoluteFilePath), newFileName);
  await fsPromisesRename(absoluteFilePath, newFilePath);
}