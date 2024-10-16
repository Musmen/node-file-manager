const USER_NAME_ARGUMENT_PREFIX = '--username=';
const FIRST_USER_ARGUMENTS_INDEX = 2;
const FIRST_USER_INDEX = 0;

const getUserName = () => process.argv
  .slice(FIRST_USER_ARGUMENTS_INDEX)
  .filter(argument => argument.startsWith(USER_NAME_ARGUMENT_PREFIX))
  .map(argument => argument.slice(USER_NAME_ARGUMENT_PREFIX.length))[FIRST_USER_INDEX];

export const currentUserName = getUserName();

const USER_GREETINGS_PREFIX = 'Welcome to the File Manager';

export const printUserGreetings = (userName = currentUserName) => console.log(`${USER_GREETINGS_PREFIX}, ${userName}`);

const USER_GOODBYE_PREFIX = 'Thank you for using File Manager';
const USER_GOODBYE_POSTFIX = 'goodbye!';

export const printUserGoodbye = (userName = currentUserName) => console.log(`${USER_GOODBYE_PREFIX}, ${userName}, ${USER_GOODBYE_POSTFIX}`);