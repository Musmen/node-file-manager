import { open as fsPromisesOpen } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

import { getAbsolutePath } from '../../../common/helpers/helper.js';

export const copyFile = async (sourceFilePath, destinationDirPath, currentDirectory) => {
  let sourceFh, destinationFh;
  
  try {
    const absoluteSourceFilePath = getAbsolutePath(sourceFilePath, currentDirectory);
    sourceFh = await fsPromisesOpen(absoluteSourceFilePath);
    const readStream = await sourceFh.createReadStream();

    const absoluteDestinationFilePath = getAbsolutePath(path.join(destinationDirPath, path.basename(sourceFilePath)), currentDirectory);
    destinationFh = await fsPromisesOpen(absoluteDestinationFilePath, 'wx');
    const writeStream = await destinationFh.createWriteStream();

    await pipeline(readStream, writeStream);
  } catch(error) {
    throw new Error(error);
  } finally {
    sourceFh && sourceFh.close();
    destinationFh && destinationFh.close();
  }
}