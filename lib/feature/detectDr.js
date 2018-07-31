
import * as ways from './detectWay'
export default class DetectDr {
  constructor (config) {
    this.detect = ways.defaultDetect.bind(this, config)
  }
}
