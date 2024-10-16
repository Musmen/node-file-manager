import os from 'node:os';

import { mapCPUsInfoToMessage } from './helpers/os.helper.js';
import { ERRORS_MESSAGES } from '../../common/constants/constants.js';
import { OS_ARGUMENTS, EOL } from './constants/os.constants.js';

export const osController = (arg) => {
  let message;

  switch (arg) {
    case OS_ARGUMENTS.EOL:
      message = (os.EOL === EOL.WINDOWS_STANDART) ? EOL.WINDOWS : EOL.POSIX;
      break;
    case OS_ARGUMENTS.CPUS:
      const cpus = os.cpus();
      message = {
        CPUsAmount: cpus.length,
        CPUsInfo: cpus.map(mapCPUsInfoToMessage)
      };
      break;
    case OS_ARGUMENTS.HOMEDIR:
      message = os.homedir();
      break;
    case OS_ARGUMENTS.USERNAME:
      message = os.userInfo().username;
      break;
    case OS_ARGUMENTS.ARCHITECTURE:
      message = os.arch();
      break;
    default:
      console.error(ERRORS_MESSAGES.INPUT);
      return;
  }

  console.log(message);
}