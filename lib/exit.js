'use strict'
const boxen = require('boxen')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = () => {
  const terminus = fs.readFileSync(path.join(__dirname, 'logo.txt'), 'utf8')
  console.log(boxen(
    'Bye from us!\n' +
    chalk.blue(terminus)
  , {
    padding: 1,
    borderStyle: 'round'
  }))
  process.exit()
}
