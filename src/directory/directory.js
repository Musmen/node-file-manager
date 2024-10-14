export const currentDirectory = process.env.HOME;

const CURRENT_DIRECTORY_PREFIX = 'You are currently in';

export const printCurrentDirectory = 
  (directory = currentDirectory) => console.log(`${CURRENT_DIRECTORY_PREFIX} ${directory}`);