const { Transform } = require('stream')
const config = require('./main')

let prevBuffer = ''
let keys = []
let setHeader = false

const splitByRow = new Transform({
  writableObjectMode: true,

  transform (chunk, encoding, callback) {
    const chunkToString = chunk.toString()
    const newChunk = prevBuffer + chunkToString

    if (newChunk.includes('\r') || newChunk.includes('\n')) {
      const splitByNewLine = newChunk.split('\n')

      if (splitByNewLine) {
        if (setHeader) {
          this.push(splitByNewLine[0])
        } else {
          keys = splitByNewLine[0].split(',')
          setHeader = true
        }
        prevBuffer = splitByNewLine[1]
      }
    } else if (chunkToString.length < config.streamSizeInBytes) {
      this.push(newChunk)
    } else {
      prevBuffer += chunkToString
    }
    callback()
  }
})

const convertToJSON = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform (chunk, encoding, callback) {
    const row = chunk.toString().split(',')
    const rowObj = {}
    for (const [index, value] of row.entries()) {
      rowObj[keys[index].trim()] = value.trim()
    }
    this.push(JSON.stringify(rowObj))
    callback()
  }
})

module.exports = {
  splitByRow,
  convertToJSON
}
