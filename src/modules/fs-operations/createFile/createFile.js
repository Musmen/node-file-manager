import path from 'node:path';
import { open as fsPromisesOpen } from 'node:fs/promises';

import { checkFileName } from '../../../common/helpers/helper.js';

export const createFile = async (fileName, currentDirectory) => {
  checkFileName(fileName);
  const filePath = path.join(currentDirectory, fileName);
  const fd = await fsPromisesOpen(filePath, 'w');
  fd.close();
}