import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { COMMAND } from '../constants/index.js'

import { dateToTimeStamp, isValidDate } from './datetime.js'

const argv = yargs(hideBin(process.argv))
  .usage('node $0 <command> [options]')
  .command(COMMAND.PORTFOLIO, 'List the portfolio of the token', (yargs) => {
    return yargs
      .option({
        token: {
          alias: 't',
          description: 'Enter token name',
          type: 'string',
        },
        date: {
          alias: 'd',
          description: 'Enter date in YYYY-MM-DD format',
          type: 'string',
        },
      })
      .strictOptions()
      .check((arg, options) => {
        arg.command = arg._[0]

        /// check token
        if ('token' in arg) {
          if (!arg.token) {
            throw new Error('Enter token name')
          }
        }

        /// check date and convert it to epoch timestamp
        if ('date' in arg) {
          if (arg.date) {
            if (isValidDate(arg.date)) {
              let [startTimestamp, endTimestamp] = dateToTimeStamp(arg.date)
              arg.startTimestamp = startTimestamp
              arg.endTimestamp = endTimestamp
            } else {
              throw new Error('Enter valid date in YYYY-MM-DD format')
            }
          } else {
            throw new Error('Enter date')
          }
        }

        return true
      })
  })
  .strictCommands()
  .check((arg, options) => {
    if (!Object.values(COMMAND).includes(arg._[0])) {
      throw new Error('Enter valid command')
    }
    return true
  })
  .help()
  .alias('version', 'v')
  .alias('help', 'h').argv

export default argv
