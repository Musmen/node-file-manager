import { pipeline } from 'node:stream/promises';

import { printUserGreetings, printUserGoodbye } from './modules/user/user.js';
import { directoryController } from './modules/directory/directory.controller.js';
import { controller } from './controller/main.controller.js';

printUserGreetings();
directoryController.printCurrentDirectory();

process.on('exit', () => printUserGoodbye());
process.on('SIGINT', () => process.exit());

await pipeline(process.stdin, controller);