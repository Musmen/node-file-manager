import { pipeline } from 'node:stream/promises';

import { printUserGreetings, printUserGoodbye } from './user/user.js';
import { printCurrentDirectory } from './directory/directory.js';
import { controller } from './controller/controller.js';

printUserGreetings();
printCurrentDirectory();

process.on('exit', () => printUserGoodbye());
process.on('SIGINT', () => process.exit());

await pipeline(process.stdin, controller, process.stdout);