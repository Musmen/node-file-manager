import { Transform } from 'node:stream';

class Controller extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, _, callback) {
    try {
      const command = chunk.toString('utf8').trim();
      if (command === '.exit') process.exit();
  
      callback(null, command);
    } catch(error) {
      callback(error);
    }
  }
};

export const controller = new Controller();