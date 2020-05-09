const { Transform } = require('stream')

let prevBuff = ''

const test = new Transform({
  writableObjectMode: true,

  transform (chunk, encoding, callback) {
    // console.log(` prevBuff : ${prevBuff}`)
    const newChunk = prevBuff + chunk.toString()
    if (newChunk.includes('\n')) {
      const splitter = newChunk.split('\n')
      prevBuff = splitter[1]
      this.push(splitter[0])
      callback()
    } else {
      prevBuff += chunk.toString()
      this.push('null')
      callback()
    }
  }
})

const splitByRow = new Transform({
  readableObjectMode: true,

  transform (chunk, encoding, callback) {
    this.push(chunk.toString().split('\n'))
    callback()
  }
})

const convertToJSON = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform (chunk, encoding, callback) {
    if (chunk.toString() !== 'null') {
      console.log(` data : ${chunk}`)
    } else {
      console.log(` error : ${chunk}`)
    }

    // const arr = []
    // for (let i = 0; i < chunk.length; i++) {
    //   const row = chunk[i].split(',')
    //   const obj = {}
    //   for (let j = 0; j < row.length; j++) {
    //     obj[j] = row[j].trim()
    //   }
    //   arr.push(obj)
    // }
    // this.push(arr)
    this.push(chunk)
    callback()
  }
})

module.exports = {
  splitByRow,
  convertToJSON,
  test
}
