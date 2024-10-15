import { open as fsPromisesOpen } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

import { getAbsolutePath } from '../helpers/helper.js';

export const copyFile = async (sourceFilePath, destinationDirPath, currentDirectory) => {
  const absoluteSourceFilePath = getAbsolutePath(sourceFilePath, currentDirectory);
  const sourceFh = await fsPromisesOpen(absoluteSourceFilePath);
  const readStream = await sourceFh.createReadStream();

  const absoluteDestinationFilePath = getAbsolutePath(path.join(destinationDirPath, path.basename(sourceFilePath)), currentDirectory);
  const destinationFh = await fsPromisesOpen(absoluteDestinationFilePath, 'wx');
  const writeStream = await destinationFh.createWriteStream();

  return pipeline(readStream, writeStream);
}