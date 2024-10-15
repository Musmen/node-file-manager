import path from 'node:path';
import { readdir as fsPromisesReaddir } from 'node:fs/promises';

export const getDirectoryContent = async (path) => {
  const dirContent = await fsPromisesReaddir(path, { withFileTypes: true });
  return dirContent;
}

export const getAbsolutePath = (newPath, currentDirectory) => {
  const normalizedPath = path.normalize(newPath);
  const resolvedPath = (path.resolve(newPath) === normalizedPath)
    ? normalizedPath
    : path.join(currentDirectory, normalizedPath);

  return resolvedPath;
}