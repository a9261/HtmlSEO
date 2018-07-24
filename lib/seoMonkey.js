const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export default class SeoMonkey {
    Run() {
        let demoContent =`<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<div>
<h1>This is a Heading</h1>
<h1>This is a Heading</h1>
<h1>This is a Heading</h1>
</div>
</body>
</html>`;
        
        const doc = new JSDOM(demoContent).window.document;
        return doc.querySelectorAll('h1').length;
    }
}
let m = new SeoMonkey();
console.log(m.Run());

