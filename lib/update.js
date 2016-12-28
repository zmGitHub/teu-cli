'use strict'
const updateNotifier = require('update-notifier')

module.exports = (pkg) => {
  // TODO: 后续处理
  updateNotifier({pkg}).notify()
}
