import { rm as fsPromisesRemove } from 'node:fs/promises';

import { getAbsolutePath, checkIsFile} from '../helpers/helper.js';

export const deleteFile = async (filePath, currentDirectory) => {
  const absoluteFilePath = getAbsolutePath(filePath, currentDirectory);
  await checkIsFile(absoluteFilePath);
  await fsPromisesRemove(absoluteFilePath);
}