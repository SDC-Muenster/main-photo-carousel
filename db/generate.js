const casual = require('casual');
const fs = require('fs');
const path = require('path');
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
    result.push(images[index]);
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

  let csv = '';

  for (let i = 0; i < num; i += 1) {
    const home = new Home();
    csv += `"${home.photos}","${home.description}"\n`;
  }

  return csv;
};
