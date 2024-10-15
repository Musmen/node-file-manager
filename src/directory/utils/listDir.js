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

export const listDirectory = (dirContent) => {
  console.table(dirContent
    .map(dirContentItem => (
      { 
        Name: dirContentItem.name, 
        Type: getDirContentType(dirContentItem),
      }
    ))
  ); 
}