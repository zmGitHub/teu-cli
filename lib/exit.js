'use strict'
const boxen = require('boxen')
const chalk = require('chalk')

module.exports = () => {
  const url = chalk.underline('http://www.terminus.io')
  console.log(boxen(
    'Bye from us!\n' +
    chalk.blue('Terminus team \n') +
    url
  , {
    padding: 2,
    borderStyle: 'round'
  }))
  process.exit()
}
