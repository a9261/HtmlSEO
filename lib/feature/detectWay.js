import jsdom from 'jsdom'
const {JSDOM} = jsdom
export function defaultDetect (config, source = null) {
  if (source == null) {
    throw new Error('source cannot empty')
  }

  let processResult = source
    .getSourceData()
    .then((data) => {
      const doc = new JSDOM(data).window.document
      let msg = []
      let promises = config
        .MonkeyRules
        .map((rule) => {
          // return new Promise(function (resolve) {
          //   let detectNum = doc
          //     .querySelectorAll(rule.SearchRule)
          //     .length
          //   let fullMsg = rule.DetectedText.length > 0
          //     ? rule.DetectedText
          //     : config.DetectedText
          //   fullMsg = fullMsg
          //     .replace('{RuleName}', rule.RuleName)
          //     .replace('{Num}', detectNum)
          //     .replace('{Minimum}', rule.Minimum)
          //     .replace('{Maximum}', rule.Maximum)
          //   if (detectNum < rule.Minimum || detectNum > rule.Maximum) {
          //     fullMsg = '[Warning] ' + fullMsg
          //   }
          //   resolve(fullMsg)
          // }) // end Promise
          msg.push(getDetectMsg(doc, rule, config))
        })
      return msg
      // return (Promise.all(promises))
    }) // end processResult
  return processResult
}

function getDetectMsg (doc, rule, config) {
  let detectNum = doc
    .querySelectorAll(rule.SearchRule)
    .length
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
