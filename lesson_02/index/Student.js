const EventEmitter = require('events');
const { isEmptyArray, isFullArray } = require('./helpers');

class Student extends EventEmitter {
  constructor(firstName, lastName, yearOfBirth) {
    super();

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.lessons = [];

    this.init();
  }

  //extends parents methods
  emit(evantName, ...args) {
    if (super.emit(evantName, ...args)) this._startNotifications();
  }

  init() {
    this.on('created', this.isCreated);
    this.on('present', this.setVisit);
    this.on('setPoint', this.setPoint);
    this.on('maxPoint', this.getMaxPoint);
    this.on('averagePoint', this.getAveragePoint);
    this.once('studentAge', this.getAge);
    this.emit('created');
  }

  isCreated() {
    this._isCreated = true;
    console.log('isCreated', this._isCreated);
  }

  setVisit() {
    if (isFullArray(this.lessons)) return;
    this.lessons.push({ present: true, point: 0 });
    console.log('visits', this.lessons);
  }

  setPoint(point = 0) {
    if (isEmptyArray(this.lessons)) return;
    this.lessons[this.lessons.length - 1].point = point;
    console.log('points', this.lessons);
  }

  getMaxPoint() {
    if (isEmptyArray(this.lessons)) return;
    const maxPoint = Math.max(...this.lessons.map(({ point }) => point));
    console.log('maxPoint', maxPoint);
    // return maxPoint;
  }

  getAveragePoint() {
    if (isEmptyArray(this.lessons)) return;
    const sumOfPoints = this.lessons.reduce((acc, { point }) => (acc += point), 0);
    const averagePoint = parseInt(sumOfPoints / this.lessons.length);
    console.log('averagePoint', averagePoint);
    // return maxPoint;
  }

  getAge() {
    this.age = new Date().getFullYear() - this.yearOfBirth;
    console.log(this.age);
  }

  _startNotifications(time) {
    clearInterval(this._interval);
    this._interval = setInterval(this._sendNotification, 10 * 1000);
  }

  _sendNotification() {
    console.log('Please do something');
  }
}

module.exports = Student;
