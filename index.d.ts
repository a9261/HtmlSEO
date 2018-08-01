// Type definitions for seomonkey 1.1
// Project: https://github.com/a9261/HtmlSEO#readme
// Definitions by: My Self <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export class MonkeyRule {
    RuleName:string;
    SearchRule:string;
    Minimum:number;
    Maximum:number;
    DetectedText:string;
    constructor();
    valid(): void;
}
export class ConfigModel {
    DetectedText:string;
    MonkeyRules:MonkeyRule[]
    constructor(config: string);
    addRule(rule: MonkeyRule): void;
    clearAllRule(): void;
    removeRuleAt(index: number): void;
}
export class BaseSource {
    isValid:boolean;
    source:any;
    errorMsg:string;
    constructor(stream: any);
    getSourceData(): string;
}
export class StreamSource extends BaseSource {
    constructor(stream: any);
    getSourceData(): string;
}
export class HtmlSource  extends BaseSource {
    constructor(filePath: string)
    getSourceData(): string;
}

export class SeoMonkey {
    constructor (configFileName:string='seomonkey.config.json'); 
    config: ConfigModel;
    inputSource: BaseSource;
    saveResultToConsole ()  : void
    saveResultToStream (targetStream:any) : void
    saveResultToFile (outputPath:string)  : void
  }

