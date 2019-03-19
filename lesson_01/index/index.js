const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

switch (NODE_ENV) {
  case 'one':
    console.log('NODE_ENV: ', NODE_ENV, PORT, parseArgs);
    const joinItems = require('./hw_task_3/module_01.js');
    break;

  case 'two':
    console.log('NODE_ENV', NODE_ENV);

    const joinItems = require('./hw_task_3/module_02.js').joinItems;
    break;

  case 'three':
    console.log('NODE_ENV', NODE_ENV);
    const joinItems = require('./hw_task_3/module_03.js').joinItems;

    break;

  default:
    'unexpected environvent';
}
