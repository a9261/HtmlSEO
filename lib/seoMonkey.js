import cfg from 'find-config'
import fs from 'fs'
import DetectDr from './feature/detectDr'
import ConfigModel from './Shared/configModel'
// Symbol for private function
const _init = Symbol('_init')
const _detect = Symbol('_detect')
const _checkSourceIsReady = Symbol('_checkSourceIsReady')
export default class SeoMonkey {
  constructor (configFileName = 'seomonkey.config.json') {
    // Config Parameter
    this.config = null
    this.inputSource = null
    this._configFileName = configFileName
    this[_init]()
  }
  saveResultToConsole () {
    return this[_detect]().then((resultMsg) => {
      resultMsg.forEach(msg => {
        console.log(msg)
      })
      return resultMsg
    })
  }
  saveResultToStream (targetStream = null) {
    if (targetStream == null) {
      throw new Error('Target stream is require')
    }
    if (targetStream.constructor !== fs.WriteStream) {
      throw new Error('Only WriteStream can be use')
    }
    let t = this
    return new Promise((resolve, reject) => {
      t[_detect]().then((resultMsg) => {
        let inputMsg = ''
        resultMsg.forEach(msg => {
          inputMsg = inputMsg + msg + '\r\n'
        })
        targetStream.write(inputMsg, 'UTF8')
        targetStream.end()
        targetStream.on('finish', function () {
          resolve(targetStream)
        })
        targetStream.on('error', function (err) {
          reject(err)
        })
      })
    })
  }
  saveResultToFile (outputPath = null) {
    if (outputPath == null) {
      throw new Error('outputPath cannot null')
    }
    return this[_detect]().then((resultMsg) => {
      let inputMsg = ''
      resultMsg.forEach(msg => {
        inputMsg = inputMsg + msg + '\r\n'
      })
      fs.writeFileSync(outputPath, inputMsg)
      return ('write to file done')
    })
  }
  // Set all below  as private function
  [_init] () {
    // Read Config File
    let data = null
    try {
      data = fs.readFileSync(cfg(this._configFileName, {dir: '/'}))
    } catch (error) {
      throw new Error('Cannot find config file , Monkey is crazy')
    }
    this.config = new ConfigModel(data)
  }
  [_detect] () {
    this[_checkSourceIsReady]()
    let dr = new DetectDr(this.config)
    let result = dr.detect(this.inputSource)
    return result.then((allPromise) => {
      return Promise.all(allPromise)
    })
  }
  [_checkSourceIsReady] () {
    if (this.inputSource == null) {
      throw new Error('Input source is empty')
    }
  }
}
