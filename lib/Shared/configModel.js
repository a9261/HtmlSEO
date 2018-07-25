class MonkeyRule {
    constructor() {
        this.RuleName = "";
        this.SearchRule = "";
        this.Minimum = 0;
        this.Maximum = 0;
        this.DetectedText = "";
    }
}

export default class ConfigModel {
    constructor(config) {
        this.DetectedText = config.DetectedText || "";
        this.MonkeyRules = this._getRules(config.MonkeyRules) || [];
    }
    _getRules(rules) {
        let result = rules.map((item) => {
            let rule = new MonkeyRule();
            Object.assign(rule, item)
            return rule
        });
        return result.length > 0
            ? result
            : null;
    }
}