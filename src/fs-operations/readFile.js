import { open as fsPromisesOpen } from 'node:fs/promises';
import { finished } from 'node:stream/promises';

import { getAbsolutePath, consoleLogChankInUtf8 } from '../helpers/helper.js';

export const readFileToConsole = async (filePath, currentDirectory) => {
  let fh;
  
  try {
    const absoluteFilePath = getAbsolutePath(filePath, currentDirectory);
    fh = await fsPromisesOpen(absoluteFilePath);
    const readStream = await fh.createReadStream();

    readStream.on('data', consoleLogChankInUtf8);
    
    await finished(readStream);
  } catch(error) {
    throw new Error(error);
  } finally {
    fh && fh.close();
  }
}