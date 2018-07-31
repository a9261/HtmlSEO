
const _valid = Symbol('protetcedValid')
class BaseSource {
  constructor (source = null) {
    this.isValid = true
    this.source = source
    this.errorMsg = ''
  }
  [_valid] () {
    if (this.source == null) {
      throw new Error('Source parameter cannot be null')
    }
  }
  getSourceData () {

  }
}

export {_valid, BaseSource as default}
