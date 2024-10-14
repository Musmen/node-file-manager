const COMMAND_DELIMITER = ' ';
const COMMAND_INDEX = 0;
const FIRST_ARGS_INDEX = 1;

export const parseUserCliCommand = (chunk) => {
  const chunkNormalizedString = chunk.toString('utf8').trim();
  const commandArgs = chunkNormalizedString.split(COMMAND_DELIMITER);
  const command = commandArgs[COMMAND_INDEX];
  const argument = commandArgs[FIRST_ARGS_INDEX];
  
  return { command, argument };
}