const fs = require('fs')
const { splitByRow, convertToJSON } = require('./util')

const params = {
  filePath: './sample.csv',
  streamSizeInBytes: 64
}

const parser = async (params) => {
  const { filePath, streamSizeInBytes } = params
  const readStream = fs.createReadStream(filePath, { highWaterMark: streamSizeInBytes })

  readStream
    .pipe(splitByRow)
    .pipe(convertToJSON)
    .pipe(process.stdout)
}

parser(params).catch((error) => {
  throw new Error(`Error in processing csv file. ${error}`)
})

module.exports = {
  config: params
}
