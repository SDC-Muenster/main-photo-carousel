const casual = require('casual');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const images = require('./imageUrls');

casual.seed(41);

const createPhotoArray = () => {
  const result = [];
  const storage = {};
  for (let i = 0; i < 10; i += 1) {
    let index;
    let exists = true;
    while (exists === true) {
      index = casual.integer(0, 34);
      exists = storage[index];
    }
    result.push(`"${images[index]}"`);
    storage[index] = !storage.index;
  }
  return result;
};

const generateCsv = (num) => {
  class Home {
    constructor() {
      this.photos = createPhotoArray();
      this.description = casual.sentence;
    }
  }

  let result = '';

  for (let i = 0; i < num; i += 1) {
    const home = new Home();
    result += `"{${home.photos}}","${home.description}"\n`;
  }

  return result;
};

const writeDataToFile = () => {
  const stream = fs.createWriteStream(path.join(__dirname, 'data.csv'));
  Promise.promisifyAll(stream);

  Promise.try(() => {
    return stream.writeAsync('photos,description\n', 'utf8');
  }).then(() => {
    let i = 1000;
    while (i > 0) {
      const data = generateCsv(10000);
      stream.writeAsync(data, 'utf8');
      i -= 1;
    }
  }).then(() => {
    stream.end();
  });
};

writeDataToFile();
