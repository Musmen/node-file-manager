import { printUserGreetings, printUserGoodbye } from './user/user.js';
import { printCurrentDirectory } from './directory/directory.js';

printUserGreetings();
printCurrentDirectory();

process.on('exit', () => printUserGoodbye());