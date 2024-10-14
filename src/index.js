import { printUserGreetings, printUserGoodbye } from './user/user.js';

printUserGreetings();

process.on('exit', () => printUserGoodbye());