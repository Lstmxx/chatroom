const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const { vueTemplate, indexTemplate, lessTemplate } = require('./template')

// 设置终端字体颜色
const log = message => console.log(chalk.blue(`${message}`))
const successLog = message => console.log(chalk.green(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
function doExistDirectoryCreate (directory) {
  return new Promise((resolve) => {
    fs.mkdir(directory, { recursive: true }, error => {
      if (error) {
        errorLog(error)
        errorLog('8行，创建目录失败')
      } else {
        successLog(`创建目录${directory}成功！`)
        resolve(true)
      }
    })
  })
}
let componentName = ''
let lessName = ''
const index = 'index.ts'
// 需要在哪个路径自行修改
log('请输入需要新建的组件名：')
process.stdin.on('data', async chunk => {
  let input = String(chunk).trim().toString().split(' ')
  log(input)
  let basePath = `src/${input[0]}/`
  const fatherName = input[1]
  const inputName = input[2]
  basePath = basePath + fatherName + '/' + inputName
  log(basePath)
  const componentDirectory = resolve(`../${basePath}`) + '\\'
  componentName = inputName + '.vue'
  lessName = inputName + '.less'
  if (fs.existsSync(componentDirectory)) {
    errorLog(`${inputName}已存在`)
    return
  } else {
    log(`正在生成目录${basePath}`)
    await doExistDirectoryCreate(componentDirectory)
  }
  try {
    // 创建vue文件
    log(`正在创建${basePath + componentName}`)
    await generateFile(componentDirectory + componentName, vueTemplate(inputName))
    successLog(`创建vue组件：${basePath + '/' + componentName}成功！`)

    // 创建index文件
    log(`正在创建${basePath + index}`)
    await generateFile(componentDirectory + index, indexTemplate(inputName))
    successLog(`创建index文件：${basePath + '/' + index}成功`)

    // 创建less文件
    log(`正在创建${basePath + lessName}`)
    await generateFile(componentDirectory + lessName, lessTemplate(inputName))
    successLog(`创建less文件：${basePath + '/' + lessName}成功！`)

    successLog(`创建成功！！！`)
  } catch (e) {
    errorLog(e)
  }
  process.stdin.emit('end')
})
process.stdin.on('end', () => {
  log('exit')
  process.exit()
})
