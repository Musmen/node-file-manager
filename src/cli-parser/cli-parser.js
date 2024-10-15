const SPACE = ' ';
const COMMAND_DELIMITER = SPACE;
const DEFAULT_ARGS_DELIMITER = SPACE;
const SPECIAL_ARGS_DELIMITERS = [ '"', '\''];
const INPUT_ERROR = 'Invalid input';

const parseArgumentsString = (argsString) => {
  const args = [];
  let currentArg = '';
  let openDelimiter = '';
  const delimiterIsOpen = () => Boolean(openDelimiter);

  [...argsString].forEach(char => {
    if (char === DEFAULT_ARGS_DELIMITER && !delimiterIsOpen()) {
      currentArg && args.push(currentArg);
      currentArg = '';
      return;
    }

    if (SPECIAL_ARGS_DELIMITERS.includes(char)) {
      if (delimiterIsOpen()) {
        if (openDelimiter !== char) throw new Error(INPUT_ERROR);
        openDelimiter = '';
        return;
      }
      
      openDelimiter = char;
      return;
    }
    
    currentArg += char;
  })

  if (delimiterIsOpen()) throw new Error(INPUT_ERROR);
  currentArg && args.push(currentArg);
  return args;
}

export const parseUserCliCommand = (chunk) => {
  const chunkNormalizedString = chunk.toString('utf8').trim();
  const commandDelimiterIndex = chunkNormalizedString.indexOf(COMMAND_DELIMITER);

  let command = '';
  let argsString = '';

  if (~commandDelimiterIndex) {
    command = chunkNormalizedString.slice(0, commandDelimiterIndex);
    argsString = chunkNormalizedString.slice(commandDelimiterIndex + 1);
    
    if (argsString) {
      const [ firstArg, secondArg ] = parseArgumentsString(argsString);
      return { command, firstArg, secondArg }
    };
  } else {
    command = chunkNormalizedString;
    if (!command) throw new Error(INPUT_ERROR);
  }
  
  return { command };
}
  