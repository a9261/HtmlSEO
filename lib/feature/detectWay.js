import cheerio from 'cheerio'
// const cheerio = require('cheerio')
export function defaultDetect (config, source = null) {
  if (source == null) {
    throw new Error('source cannot empty')
  }

  let processResult = source
    .getSourceData()
    .then((data) => {
      const doc = cheerio.load(data)
      let promises = config
        .MonkeyRules
        .map((rule) => {
          return new Promise(function (resolve) {
            resolve(getDetectMsg(doc, rule, config))
          }) // end Promise
        })
      return promises
    }) // end processResult
  return processResult
}
function getDetectMsg (doc, rule, config) {
  let detectNum = doc(rule.SearchRule).get().length
  let fullMsg = rule.DetectedText.length > 0
    ? rule.DetectedText
    : config.DetectedText
  fullMsg = fullMsg
    .replace('{RuleName}', rule.RuleName)
    .replace('{Num}', detectNum)
    .replace('{Minimum}', rule.Minimum)
    .replace('{Maximum}', rule.Maximum)
  if (detectNum < rule.Minimum || detectNum > rule.Maximum) {
    fullMsg = '[Warning] ' + fullMsg
  }
  return fullMsg
}
