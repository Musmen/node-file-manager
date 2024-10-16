import { open as fsPromisesOpen } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';

import { getAbsolutePath } from '../helpers/helper.js';

export const compress = async (sourceFilePath, destinationFilePath, currentDirectory) => {
  const absoluteSourceFilePath = getAbsolutePath(sourceFilePath, currentDirectory);
  const sourceFh = await fsPromisesOpen(absoluteSourceFilePath);
  const readStream = await sourceFh.createReadStream();

  const absoluteDestinationFilePath = getAbsolutePath(destinationFilePath, currentDirectory);
  const destinationFh = await fsPromisesOpen(absoluteDestinationFilePath, 'wx');
  const writeStream = await destinationFh.createWriteStream();

  const brotliCompressStream = createBrotliCompress();

  await pipeline(readStream, brotliCompressStream, writeStream);
};