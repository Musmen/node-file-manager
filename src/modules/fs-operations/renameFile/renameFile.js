import path from 'node:path';
import { rename as fsPromisesRename } from 'node:fs/promises';

import { getAbsolutePath, checkFileName, checkIsFile } from '../../../common/helpers/helper.js';

export const renameFile = async (filePath, newFileName, currentDirectory) => {
  checkFileName(newFileName);
  
  const absoluteFilePath = getAbsolutePath(filePath, currentDirectory);
  await checkIsFile(absoluteFilePath);
  
  const newFilePath = path.join(path.dirname(absoluteFilePath), newFileName);
  await fsPromisesRename(absoluteFilePath, newFilePath);
}