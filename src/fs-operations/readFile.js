import { open as fsPromisesOpen } from 'node:fs/promises';
import { finished } from 'node:stream/promises';

import { getAbsoluteNewPath, consoleLogChankInUtf8 } from '../helpers/helper.js';

export const readFileToConsole = async (filePath, currentDirectory) => {
  const absoluteFilePath = await getAbsoluteNewPath(filePath, currentDirectory);
  const fh = await fsPromisesOpen(absoluteFilePath);
  const readStream = await fh.createReadStream();

  readStream.on('data', consoleLogChankInUtf8);
  
  return finished(readStream);
}