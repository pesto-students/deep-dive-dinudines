const fs = require("fs");
const { splitByRow, convertToJSON, test } = require("./util");

const params = {
  filePath: "./sample.csv",
};

const parser = async (params) => {
  const { filePath } = params;

  const readStream = fs.createReadStream(filePath, { highWaterMark: 64 });

  readStream
    .pipe(splitByRow)
    .pipe(convertToJSON)
    .pipe(test)
    .pipe(process.stdout);
};

parser(params).catch((err) => {
  console.log(`err : ${err}`);
});

module.exports = parser;
