import { copyFile, deleteFile } from './index.js';

export const moveFile = async (sourceFilePath, destinationDirPath, currentDirectory) => {
  await copyFile(sourceFilePath, destinationDirPath, currentDirectory);
  await deleteFile(sourceFilePath, currentDirectory);
}