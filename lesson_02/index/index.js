const Student = require('./Student');
const consoleBeautify = require('./consoleBeautify')();
const student = new Student('ivan', 'ivnov', 1950);

student.emit('studentAge');
student.emit('present');
student.emit('setPoint', 2);

student.emit('present');
student.emit('setPoint', 4);

student.emit('maxPoint');
student.emit('averagePoint');

student.emit('some');

setTimeout(() => {
  student.emit('present');
  student.emit('setPoint', 20);
}, 2000);

setTimeout(() => {
  student.emit('maxPoint');
  student.emit('averagePoint');
}, 4000);
