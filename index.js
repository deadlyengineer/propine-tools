import argv from './utils/command_cli.js'
import Portfolio from './core/index.js'
import { COMMAND, fileName } from './constants/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tokenName = argv[COMMAND.TOKEN]
const date = argv[COMMAND.DATE]

switch (argv.command) {
  case COMMAND.PORTFOLIO:
    const filePath = path.resolve(__dirname, fileName)
    const portfolio = Portfolio.getInstance(filePath)
    if (tokenName && date) {
      portfolio.getPortfolio(tokenName, date).then(() => {
        portfolio.printPortfolio()
      })
    } else if (tokenName) {
      portfolio.getPortfolio(tokenName).then(() => {
        portfolio.printPortfolio()
      })
    } else if (date) {
      portfolio.getPortfolio(null, date).then(() => {
        portfolio.printPortfolio()
      })
    } else {
      portfolio.getPortfolio().then(() => {
        portfolio.printPortfolio()
      })
    }
    break

  default:
    console.error(`${argv.command} is not a valid command`)
}
