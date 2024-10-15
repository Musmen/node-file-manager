import { rm as fsPromisesRemove } from 'node:fs/promises';

import { getAbsolutePath, checkIsFile} from '../helpers/helper.js';
import { ERRORS_MESSAGES } from '../constants/constants.js';

export const deleteFile = async (filePath, currentDirectory) => {
  const absoluteFilePath = getAbsolutePath(filePath, currentDirectory);
  if (!(await checkIsFile(absoluteFilePath))) throw new Error(ERRORS_MESSAGES.INPUT);
  await fsPromisesRemove(absoluteFilePath);
}