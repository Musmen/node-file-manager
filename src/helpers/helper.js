import path from 'node:path';
import { stat as fsPromisesStat } from 'node:fs/promises';

import { getAbsolutePath } from '../directory/helpers/directory.helper.js';
import { ERRORS_MESSAGES } from '../constants/constants.js';

export const consoleLogChankInUtf8 = (chank) => console.log(chank.toString('utf8'));

export const checkFileName = (fileName) => {
  const baseFileName = path.parse(fileName).base;
  if (baseFileName !== fileName) throw new Error(ERRORS_MESSAGES.INPUT);
}

const getPathStats = async (sourcePath) => await fsPromisesStat(sourcePath);

export const checkIsFile = async (sourcePath) => {
  const pathStats = await getPathStats(sourcePath);
  return pathStats.isFile();
}

export const checkIsDirectory = async (sourcePath) => {
  const pathStats = await getPathStats(sourcePath);
  return pathStats.isDirectory();
} 

export { getAbsolutePath };