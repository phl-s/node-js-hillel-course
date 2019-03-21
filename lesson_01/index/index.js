const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const ora = require('ora');

if (NODE_ENV === 'red') {
  const joinArguments = require('./hw_task_3/module_01.js');
  console.log('NODE_ENV: ', NODE_ENV, PORT);
  console.log('joinArguments', joinArguments('one', 'two', 'three', 'four', 'five'));
  //
} else if (NODE_ENV === 'green') {
  console.log('NODE_ENV: ', NODE_ENV, PORT);
  const joinArguments = require('./hw_task_3/module_02.js').joinArguments;
  console.log('joinArguments', joinArguments('one', 'two', 'three', 'four', 'five'));
  //
} else if (NODE_ENV === 'blue' && PORT === '3002') {
  console.log('NODE_ENV: ', NODE_ENV, PORT);
  const joinArguments = require('./hw_task_3/module_03.js').joinArguments;
  console.log('joinArguments', joinArguments('one', 'two', 'three', 'four', 'five'));
  //
} else {
  console.log('unexpected environvent');
}
