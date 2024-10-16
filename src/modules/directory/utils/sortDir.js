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

export const getSortedDirContent = (dirContent) => {
  return [...dirContent].sort(sortDirContent);
}