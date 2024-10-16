import { open as fsPromisesOpen } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

import { getAbsolutePath, consoleLogChankInUtf8 } from '../helpers/helper.js';

const HASH_ALGORITHM = 'sha256';
const ENCODING_TYPE = 'hex';

export const hashCalc = async (filePath, currentDirectory) => {
  const absoluteFilePath = getAbsolutePath(filePath, currentDirectory);
  const fh = await fsPromisesOpen(absoluteFilePath);
  const readStream = await fh.createReadStream();

  const transformStream = createHash(HASH_ALGORITHM).setEncoding(ENCODING_TYPE);

  const writeStream = new Writable({
    write(chunk, _, callback) {
      try {
        consoleLogChankInUtf8(chunk);
        callback();
      } catch(error) {
        callback(error);
      }
    },
  })

  await pipeline(readStream, transformStream, writeStream);
}