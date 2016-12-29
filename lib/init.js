'use strict'
// 终端颜色改变库
const chalk = require('chalk')
// 终端用户交互库
const inquirer = require('inquirer')
// 终端分割线
const separator = new inquirer.Separator()
// 终端加载动画
const ora = require('ora')
// node 模块获取执行路径
const path = require('path')
// git 仓库下载
const gitDownload = require('download-git-repo')
// 扩展 fs 模块
const fs = require('fs-extra')
const exists = require('fs').existsSync
// 文件删除库
const rm = require('rimraf').sync
// nodejs 核心模块扩展
const os = require('os')
// 唯一值
const uid = require('uid')
// 展示框
const boxen = require('boxen')
// 获取当前用户信息
const user = require('./git-user')()
// 退出
const exit = require('./exit')

// 定义项目架构(目前写死 后面动态添加)
const OFFICIAL_GENERATORS = [
  separator,
  {
    name: `${chalk.green('✩')} antd admin template`,
    value: 'antd-admin#develop'
  },
  {
    name: `${chalk.green('✩')} turbo admin template`,
    value: 'turbo-admin'
  }
]
module.exports = (args) => {
  const resultsPrompt = [{
    name: 'template',
    type: 'list',
    message: `Hi! ${chalk.bold(user.name)} choice you like startkit`,
    choices: OFFICIAL_GENERATORS.concat([
      separator,
      {
        name: 'Get me out of here!',
        value: 'cancle'
      }
    ])
  }]
  // 提示用户需要的项目架构
  inquirer.prompt(resultsPrompt).then((answers) => {
    if (answers.template === 'cancle') {
      exit()
    }
    download(`github:zmGitHub/${answers.template}`, answers.template)
  })
}

/**
 * Download a terminus react template
 **/
function download (templateURL, template) {
  const tmp = `${os.tmpdir()}/turbo-template-${uid()}`
  const spinner = ora('开始下载模板...')
  spinner.color = 'blue'
  // 下载模板
  spinner.start()
  gitDownload(templateURL, tmp, (error) => {
    if (error) {
      spinner.color = 'red'
      spinner.text = '模板下载失败'
      spinner.fail()
      console.log(`下载 ${templateURL} 失败! \nError: ${chalk.red(error.message)}`)
      return
    }
    spinner.color = 'green'
    spinner.text = '模板下载成功'
    spinner.succeed()
    generate(tmp, template)
  })
}

/**
 * Copy tmp project to user dir
 **/
function generate (tmp, template) {
  const currentPath = path.resolve()
  let dist = ''
  const generateQuestions = [
    {
      type: 'input',
      name: 'project',
      message: '请输入项目名称: ',
      default: template || 'antdTemplate',
      validate: (value) => {
        dist = `${currentPath}/${value}`
        return exists(dist) ? chalk.red('项目名已存在, 请重新输入') : true
      }
    }
  ]
  inquirer.prompt(generateQuestions).then((answers) => {
    console.log(chalk.cyan('🐹 项目生成中...'))
    fs.copy(tmp, dist, (error) => {
      error && console.log(chalk.red(error))
      let tip = `cd ${template} && npm install \n开发: ${chalk.magenta('npm run dev')}\nmock: ${chalk.yellow('npm run mock')}\n生产: ${chalk.green('npm run prod')}`
      console.log(`${chalk.green('🎉 项目生成成功!')}`)
      console.log(boxen(tip, {
        borderStyle: 'classic',
        padding: 2
      }))
    })
  })

  process.on('exit', () => {
    // 删除缓存目录
    rm(tmp)
  })
}
