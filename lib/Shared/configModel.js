export class MonkeyRule {
  constructor () {
    this.RuleName = ''
    this.SearchRule = ''
    this.Minimum = 0
    this.Maximum = 0
    this.DetectedText = ''
  }
  valid () {
    if (this.Minimum < 0 || this.Maximum < 0) {
      throw new Error(`The Rule ${this.RuleName} Minimum or Maximum cannot less than 0`)
    }
    if (this.Minimum > this.Maximum) {
      throw new Error(`The Rule ${this.RuleName} Minimum cannot more than Maximum`)
    }
    if (this.SearchRule.trim().length <= 0) {
      throw new Error(`The Rule ${this.RuleName} SearchRule cannot empty`)
    }
  }
}

const _getRules = Symbol('_getRules')
export default class ConfigModel {
  constructor (config) {
    config = JSON.parse(config)
    this.DetectedText = config.DetectedText || ''
    this.MonkeyRules = this[_getRules](config.MonkeyRules) || []
  }
  addRule (rule = null) {
    if (rule == null) {
      throw new Error('Rule cannot be null')
    }
    if (rule.constructor !== MonkeyRule) {
      throw new Error('Parameter should be MonkeyRule')
    }
    rule.valid()
    this.MonkeyRules.push(rule)
  }
  clearAllRule () {
    this.MonkeyRules = []
  }
  removeRuleAt (index) {
    if (!(index - 1) < this.MonkeyRules.length) {
      this.MonkeyRules.splice(index - 1, 1)
    }
  }

  [_getRules] (rules) {
    let result = rules.map((item) => {
      let rule = new MonkeyRule()
      Object.assign(rule, item)
      rule.valid()
      return rule
    })
    return result.length > 0
      ? result
      : null
  }
}
