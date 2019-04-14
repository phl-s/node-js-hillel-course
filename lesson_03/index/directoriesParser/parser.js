const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const { promisify } = require('util');
const { bindAll } = require('../helpers');

const readdir = promisify(fs.readdir);

const { parserEvents } = require('../constants');
const { IS_FILE, IS_DIR, START, END, ERROR, PAUSE, RESUME, FINISH } = parserEvents;

class DirectoriesParser extends EventEmitter {
  constructor(eventNames, depth = null) {
    super();
    this.depth = depth;
    this.events = eventNames;
    this.paused = false;
    this.pauseResolve = null;

    bindAll(this, this.init, this.pause, this.resume, this._setPausedState);

    this.init();
  }

  init() {
    this.on(this.events[END], depth => {
      if (depth === 0) {
        this.emit(this.events[FINISH]);
      }
    });
    this.on(this.events[ERROR], err => {
      console.log(err);
    });
  }

  pause() {
    if (this.paused) return;
    this.paused = true;
    this.emit(this.events[PAUSE]);
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    this.pauseResolve();
    this.emit(this.events[RESUME]);
  }

  _setPausedState() {
    return (this.pausePromise = new Promise((res, rej) => {
      this.pauseResolve = res;
    }));
  }

  async parse($path, depth = 0) {
    if (this.depth !== null && depth > this.depth) return;

    this.emit(this.events[START]);

    return new Promise(async (resolve, reject) => {
      try {
        const dirents = await readdir($path, { withFileTypes: true });

        for await (const dirent of dirents) {
          if (this.paused) await this._setPausedState();

          const currentPath = path.join($path, dirent.name);

          if (dirent.isDirectory()) {
            this.emit(this.events[IS_DIR], currentPath);

            try {
              await this.parse(currentPath, depth + 1);
            } catch (e) {
              this.emit(this.events[ERROR], e);
            }
            //
          } else if (dirent.isFile()) {
            this.emit(this.events[IS_FILE], currentPath);
          }
        }
        this.emit(this.events[END], depth);
        resolve();
        //
      } catch (e) {
        this.emit(this.events[ERROR], e);
      }
    });
  }
}

module.exports = DirectoriesParser;
