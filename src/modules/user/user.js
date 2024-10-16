import { parseArgs } from 'node:util';

import { ERRORS_MESSAGES } from '../../common/constants/constants.js';

const DEFAULT_USER_NAME = 'User';

const PARSE_ARGS_OPTIONS = {
  username: { 
    type: 'string', 
    default: DEFAULT_USER_NAME
  }
};

export let currentUserName = DEFAULT_USER_NAME;

try {
  const { values } = parseArgs({ options: PARSE_ARGS_OPTIONS });
  currentUserName = values.username;
} catch {
  console.error(ERRORS_MESSAGES.INPUT);
}

const USER_GREETINGS_PREFIX = 'Welcome to the File Manager';

export const printUserGreetings = (userName = currentUserName) => console.log(`${USER_GREETINGS_PREFIX}, ${userName}`);

const USER_GOODBYE_PREFIX = 'Thank you for using File Manager';
const USER_GOODBYE_POSTFIX = 'goodbye!';

export const printUserGoodbye = (userName = currentUserName) => console.log(`${USER_GOODBYE_PREFIX}, ${userName}, ${USER_GOODBYE_POSTFIX}`);