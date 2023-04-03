import fs from 'fs'
import papa from 'papaparse'

export const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    console.time('Loading file')

    let file = fs.createReadStream(filePath)
    papa.parse(file, {
      header: true,
      complete: (results) => {
        console.timeEnd('Loading file')
        resolve(results)
      },
      error: (err) => {
        reject(err)
      },
    })
  })
}
