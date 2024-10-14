import path from 'node:path';

export let currentDirectory = process.env.HOME;

const CURRENT_DIRECTORY_PREFIX = 'You are currently in';

export const printCurrentDirectory = 
  (directory = currentDirectory) => console.log(`${CURRENT_DIRECTORY_PREFIX} ${directory}`);

export const upDirectory = () => {
  currentDirectory = path.dirname(currentDirectory);
}