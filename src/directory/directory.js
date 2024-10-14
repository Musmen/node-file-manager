import path from 'node:path';
import { realpath as fsPromisesRealpath } from 'node:fs/promises'

export let currentDirectory = process.env.HOME;

const CURRENT_DIRECTORY_PREFIX = 'You are currently in';

export const printCurrentDirectory = 
  (directory = currentDirectory) => console.log(`${CURRENT_DIRECTORY_PREFIX} ${directory}`);

export const setCurrentDirectory = async (newPath) => {
  const normalizedPath = path.normalize(newPath);
  const resolvedPath = path.isAbsolute(normalizedPath)
    ? normalizedPath
    : path.join(currentDirectory, normalizedPath);

  currentDirectory = await fsPromisesRealpath(resolvedPath);
}

export const upDirectory = async () => await setCurrentDirectory(path.dirname(currentDirectory));
