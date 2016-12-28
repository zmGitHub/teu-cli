'use strict'
const chalk = require('chalk')

module.exports = () => {
  const gitHub = chalk.yellow('https://github.com/zmGitHub/teu-cli.git')
  console.log('  GitHub:')
  console.log('      ' + gitHub)
}
