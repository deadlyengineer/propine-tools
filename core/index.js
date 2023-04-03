import { convertCurrency } from '../api/index.js'
import { readCSV } from '../utils/csv.js'
import { dateToTimeStamp } from '../utils/datetime.js'

let instance = null

class Portfolio {
  constructor(filePath) {
    this.filePath = filePath
    this.value = {}
  }

  getPortfolio(token = null, date = null) {
    return new Promise((resolve, reject) => {
      // temp object for portfolio value
      const portfolioValue = {}

      readCSV(this.filePath).then((results) => {
        // get timestamp by date
        let startTimestamp
        let endTimestamp
        if (date) {
          // get latest date
          ;[startTimestamp, endTimestamp] = dateToTimeStamp(date)
        } else {
          if (results && results.data && results.data[0]) {
            endTimestamp = Number(results.data[0].timestamp)
            startTimestamp = endTimestamp - 24 * 60
          } else {
            reject('Incorrect data')
          }
        }

        // filter transactions by date and token
        const transactions = results.data.filter((item) => {
          if (
            item.timestamp <= startTimestamp ||
            item.timestamp > endTimestamp
          ) {
            return false
          }
          if (token && item.token !== token) {
            return false
          }
          return true
        })

        // calculate portfolio value for each tokens
        transactions.forEach(({ token, transaction_type, amount }) => {
          // init value
          if (portfolioValue[token] === undefined) portfolioValue[token] = 0

          if (transaction_type === 'WITHDRAWAL') {
            portfolioValue[token] -= Number(amount)
          } else if (transaction_type === 'DEPOSIT') {
            portfolioValue[token] += Number(amount)
          }
        })

        // calculate token prices in USD
        Promise.all(
          Object.keys(portfolioValue).map(async (token) => {
            const valueInUsd = await convertCurrency(token, 'USD')
            portfolioValue[token] *= valueInUsd
          })
        )
          .then(() => {
            this.value = portfolioValue
            resolve()
          })
          .catch((error) => {
            console.log(error.message)
            reject(error.message)
          })
      })
    })
  }

  printPortfolio() {
    console.log('Portfolio is: ', this.value)
  }

  static getInstance(filePath = '') {
    if (!instance) {
      instance = new Portfolio(filePath)
    }

    return instance
  }

  static createInstance(filePath = '') {
    const instance = new Portfolio(filePath)

    return instance
  }
}

export default Portfolio
