import path from 'node:path';

import { getAbsoluteNewPath } from '../directory/helpers/directory.helper.js';
import { ERRORS_MESSAGES } from '../constants/constants.js';

export const consoleLogChankInUtf8 = (chank) => console.log(chank.toString('utf8'));

export const checkFileName = (fileName) => {
  const baseFileName = path.parse(fileName).base;
  if (baseFileName !== fileName) throw new Error(ERRORS_MESSAGES.INPUT);
}

export { getAbsoluteNewPath };