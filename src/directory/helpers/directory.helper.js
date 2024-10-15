import path from 'node:path';
import { readdir as fsPromisesReaddir, realpath as fsPromisesRealpath } from 'node:fs/promises';

export const getDirectoryContent = async (path) => {
  const dirContent = await fsPromisesReaddir(path, { withFileTypes: true });
  return dirContent;
}

export const getAbsolutePath = async (newPath, currentDirectory) => {
  const normalizedPath = path.normalize(newPath);
  const resolvedPath = (path.resolve(newPath) === normalizedPath)
    ? normalizedPath
    : path.join(currentDirectory, normalizedPath);

  const absolutePath = await fsPromisesRealpath(resolvedPath);
  return absolutePath;
}