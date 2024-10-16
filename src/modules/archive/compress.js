import { open as fsPromisesOpen } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';

import { getAbsolutePath } from '../../common/helpers/helper.js';

export const compress = async (sourceFilePath, destinationFilePath, currentDirectory) => {
  let sourceFh, destinationFh;

  try {
    const absoluteSourceFilePath = getAbsolutePath(sourceFilePath, currentDirectory);
    sourceFh = await fsPromisesOpen(absoluteSourceFilePath);
    const readStream = await sourceFh.createReadStream();
  
    const absoluteDestinationFilePath = getAbsolutePath(destinationFilePath, currentDirectory);
    destinationFh = await fsPromisesOpen(absoluteDestinationFilePath, 'wx');
    const writeStream = await destinationFh.createWriteStream();
  
    const brotliCompressStream = createBrotliCompress();
  
    await pipeline(readStream, brotliCompressStream, writeStream);
  } catch(error) {
    throw new Error(error);
  } finally {
    sourceFh && sourceFh.close();
    destinationFh && destinationFh.close();
  }
};