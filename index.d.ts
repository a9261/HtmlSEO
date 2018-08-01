// Type definitions for seomonkey 1.1
// Project: https://github.com/a9261/HtmlSEO#readme
// Definitions by: My Self <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export class ConfigModel {
    constructor(config: string);
    addRule(rule: MonkeyRule): void;
    clearAllRule(): void;
    removeRuleAt(index: number): void;
}

export class HtmlSource {
    constructor(filePath: string)
    getSourceData(): string;

}

export class MonkeyRule {
    constructor();
    valid(): void;
}

export class StreamSource {
    constructor(stream: any);
    getSourceData(): string;
}

export class SeoMonkey {
    constructor (configFileName:string);  
    saveResultToConsole ()  : void
    saveResultToStream (targetStream:any) : void
    saveResultToFile (outputPath:string)  : void
  }

