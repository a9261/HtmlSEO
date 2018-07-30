export class MonkeyRule {
    constructor() {
        this.RuleName = "";
        this.SearchRule = "";
        this.Minimum = 0;
        this.Maximum = 0;
        this.DetectedText = "";
    }
    valid(){
        if(this.Minimum<0 || this.Maximum <0){
            throw new Error(`The Rule ${this.RuleName} Minimum or Maximum cannot less than 0`);
        }
        if(this.Minimum > this.Maximum){
            throw new Error(`The Rule ${this.RuleName} Minimum cannot more than Maximum`);
        }
        if(this.SearchRule.trim().length<=0){
            throw new Error(`The Rule ${this.RuleName} SearchRule cannot empty`);
        }
    }

}

const _getRules = Symbol('_getRules');
export default class ConfigModel {
    constructor(config) {
        config = JSON.parse(config);
        this.DetectedText = config.DetectedText || "";
        this.MonkeyRules = this[_getRules](config.MonkeyRules) || [];
    }
    [_getRules](rules) {
        let result = rules.map((item) => {
            let rule = new MonkeyRule();
            Object.assign(rule, item)
            rule.valid();
            return rule
        });
        return result.length > 0
            ? result
            : null;
    }
}