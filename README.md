SeoMonkey
=============================
This monkey tool will help detect your html tags or content by pre-define rules.
Hope for fun

## Prerequisites
Makesure you're use NodeJs version 8 and above
You can download from 
[here](https://nodejs.org/en/) 

## Install

```
$ npm i seomonkey
```

## How to play with SeoMonkey
Before start play, You need add config file on project root path.
Usually call **seomonkey.config.json**
### semonkey.config.js
```json
{
    "DetectedText":"{RuleName} are match  {Num} of elements,Mini:{Minimum} Max:{Maximum}",
    "MonkeyRules":[
        {
            "RuleName": "MonkeyRule1",
            "SearchRule":"head > title",
            "Minimum" : 1,
            "Maximum":1,
            "DetectedText":"Your {RuleName} is Match {Num} of elements"
        },
        {
            "RuleName":"MonkeyRule2",
            "SearchRule":"img:not([alt])",
            "Maximum":2
        },
        {
            "RuleName":"MonkeyRule3",
            "SearchRule":"head > meta[name='descriptions']",
            "Maximum":1
        },
        {
            "RuleName":"MonkeyRule4",
            "SearchRule":"head > meta[name='keywords']",
            "Maximum":1
        },
        {
            "RuleName":"MonkeyRule5",
            "SearchRule":"strong",
            "Maximum":15
        },
        {
            "RuleName":"MonkeyRule6",
            "SearchRule":"h1",
            "Maximum":1
        }
    ]
}
```

### Config definition

- `DetectedText`: (required) Which content and information you want to monkey told you
    - you can replace common detected text by add it to monkeyrules,Please see the MonkeyRule1
    - For got more information,You can use expression on your detected text
        - `{RuleName}` : Will replace by monkey rule name.
        - `{Num}`      : Will replace by how many html elements is fit the rule.
        - `{Minimum}` : Will replace by monkey rule definition minimum elements.
        - `{Maximum}` : Will replace by monkey rule definition maximum elements.
- `MonkeyRules`: (required) All of your rules want to monkey search.
    - `RuleName`: (required) Your favorite rule name. 
    - `SearchRule`: (required) Write the rule by use CSS-Selector.If you're not familer with this
    please refer [this](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
    - `Minimum`: Definition minimum elements should be match by rule.If not .The detected text will add [Warning] to remind you. **Default: 0**
    - `Maximum`: Definition maximum elements should be match by rule.If not .The detected text will add [Warning] to remind you **Default: 0**
    - `DetectedText`: Like common detected text.But this content will overwrite it
### Usage
#### Easy example
```javascript
    const SeoMonkey = require('seomonkey').default;
    const HtmlSource = require('seomonkey/dist/Shared/htmlSource').default;

    // Init your monkey
    const monkey = new SeoMonkey();
    // Set your source for detect
    monkey.inputSource = new HtmlSource('test.html');
    // Run the save method and get the result
    monkey.saveResultToConsole();
```
#### Input Source Definition
- `HtmlSource`  : This source is let you can input html file path as source.
- `StreamSource`: This source is let you can input custom stream  as source.
#### Output
You can choose which outputs you want
```javascript
    const SeoMonkey = require('seomonkey').default;
    const HtmlSource = require('seomonkey/dist/Shared/htmlSource').default;

    const monkey = new SeoMonkey();
    monkey.inputSource = new HtmlSource('test.html');
    // Print result to console
    monkey.saveResultToConsole();
    // Save result as stream
    monkey.saveResultAsStream();
    // Save result to file  
    monkey.saveResultAsFile();
```

