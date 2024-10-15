import path from 'node:path';
import { realpath as fsPromisesRealpath, readdir as fsPromisesReaddir, stat as fsPromisesStat } from 'node:fs/promises'

export let currentDirectory = process.env.HOME;

const CURRENT_DIRECTORY_PREFIX = 'You are currently in';

export const printCurrentDirectory = 
  (directory = currentDirectory) => console.log(`${CURRENT_DIRECTORY_PREFIX} ${directory}`);

export const setCurrentDirectory = async (newPath) => {
  const normalizedPath = path.normalize(newPath);
  const resolvedPath = (path.resolve(newPath) === normalizedPath)
    ? normalizedPath
    : path.join(currentDirectory, normalizedPath);

  const newDirectoryPath = await fsPromisesRealpath(resolvedPath);
  if (!(await fsPromisesStat(newDirectoryPath)).isDirectory()) throw new Error('Operation failed');
  currentDirectory = newDirectoryPath;
}

export const upDirectory = async () => await setCurrentDirectory(path.dirname(currentDirectory));

const getDirContent= async (path = currentDirectory) => {
  const dirContent = await fsPromisesReaddir(path, { withFileTypes: true });
  return dirContent;
}

const SORTING_ORDERS = {
  ASC: 1,
  DES: -1,
}

const sortDirContent = (firstEl, secondEl) => {
  if (firstEl.isFile() && !secondEl.isFile()) return SORTING_ORDERS.ASC;
  if (!firstEl.isFile() && secondEl.isFile()) return SORTING_ORDERS.DES;
  if (firstEl.isDirectory() && !secondEl.isDirectory()) return SORTING_ORDERS.DES;
  if (!firstEl.isDirectory() && secondEl.isDirectory()) return SORTING_ORDERS.ASC;
  return firstEl.name.localeCompare(secondEl.name);
}

const getSortedDirContent = async (path = currentDirectory) => {
  const dirContent = await getDirContent(path);
  return [...dirContent].sort(sortDirContent);
}

const DIR_CONTENT_TYPES = {
  FILE: 'file',
  DIRECTORY: 'directory',
  LINK: 'link',
  UNKNOWN: 'unknown'
}

const getDirContentType = (dirContentItem) => {
  if (dirContentItem.isFile()) return DIR_CONTENT_TYPES.FILE;
  if (dirContentItem.isDirectory()) return DIR_CONTENT_TYPES.DIRECTORY;
  if (dirContentItem.isSymbolicLink()) return DIR_CONTENT_TYPES.LINK;
  return DIR_CONTENT_TYPES.UNKNOWN;
}

const listDirectory = (dirContent) => {
  console.table(dirContent
    .map(dirContentItem => (
      { 
        Name: dirContentItem.name, 
        Type: getDirContentType(dirContentItem),
      }
    ))
  ); 
}

export const listSortedDir = async (path = currentDirectory) => {
  const sortedDirContent = await getSortedDirContent(path);
  listDirectory(sortedDirContent);
}