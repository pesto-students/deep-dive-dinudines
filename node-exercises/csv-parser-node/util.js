const { Transform } = require("stream");

const splitByRow = new Transform({
  readableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(chunk.toString().split("\n"));
    callback();
  },
});

const convertToJSON = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    const arr = [];
    for (let i = 0; i < chunk.length; i++) {
      const row = chunk[i].split(",");
      const obj = {};
      for (let j = 0; j < row.length; j++) {
        obj[j] = row[j].trim();
      }
      arr.push(obj);
    }
    this.push(arr);
    callback();
  },
});

const test = new Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    console.log(` JSON Object : ${JSON.stringify(chunk)}`);
    this.push(chunk.toString());
    callback();
  },
});

module.exports = {
  splitByRow,
  convertToJSON,
  test,
};
