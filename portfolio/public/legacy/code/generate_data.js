const fs = require('fs');
const path = require('path');

const htmlTopics = [
    "HTML Introduction", "HTML Editors", "HTML Basic", "HTML Elements", "HTML Attributes", "HTML Headings", "HTML Paragraphs", "HTML Styles", "HTML Formatting", "HTML Quotations", "HTML Comments", "HTML Colors", "HTML CSS", "HTML Links", "HTML Images", "HTML Favicon", "HTML Page Title", "HTML Tables", "HTML Lists", "HTML Block & Inline", "HTML Div", "HTML Classes", "HTML Id", "HTML Buttons", "HTML Iframes", "HTML JavaScript", "HTML File Paths", "HTML Head", "HTML Layout", "HTML Responsive", "HTML Computercode", "HTML Semantics", "HTML Style Guide", "HTML Entities", "HTML Symbols", "HTML Emojis", "HTML Charsets", "HTML URL Encode", "HTML vs. XHTML", "HTML Forms", "HTML Form Attributes", "HTML Form Elements", "HTML Input Types", "HTML Input Attributes", "HTML Canvas", "HTML SVG", "HTML Media", "HTML Video", "HTML Audio", "HTML Plug-ins", "HTML Web APIs", "HTML Geolocation", "HTML Drag and Drop", "HTML Web Storage", "HTML Web Workers", "HTML SSE"
];

const cssTopics = [
    "CSS Introduction", "CSS Syntax", "CSS Selectors", "CSS How To", "CSS Comments", "CSS Errors", "CSS Colors", "CSS Backgrounds", "CSS Borders", "CSS Margins", "CSS Padding", "CSS Height / Width", "CSS Box Model", "CSS Outline", "CSS Text", "CSS Fonts", "CSS Icons", "CSS Links", "CSS Lists", "CSS Tables", "CSS Display", "CSS Max-width", "CSS Position", "CSS Position Offsets", "CSS Z-index", "CSS Overflow", "CSS Float", "CSS Inline-block", "CSS Align", "CSS Combinators", "CSS Pseudo-classes", "CSS Pseudo-elements", "CSS Opacity", "CSS Navigation Bars", "CSS Dropdowns", "CSS Image Gallery", "CSS Image Sprites", "CSS Attribute Selectors", "CSS Forms", "CSS Counters", "CSS Units", "CSS Inheritance", "CSS Specificity", "CSS !important", "CSS Math Functions", "CSS Optimization", "CSS Accessibility", "CSS Website Layout", "CSS Rounded Corners", "CSS Border Images", "CSS Gradients", "CSS Shadows", "CSS Text Effects", "CSS Custom Fonts", "CSS 2D Transforms", "CSS 3D Transforms", "CSS Transitions", "CSS Animations", "CSS Tooltips", "CSS Image Styling", "CSS Image Modal", "CSS Image Filters", "CSS object-fit", "CSS object-position", "CSS Masking", "CSS Buttons", "CSS Pagination", "CSS Multiple Columns", "CSS Variables", "CSS @property", "CSS Box Sizing", "CSS Media Queries", "Flexbox Intro", "Flex Container", "Flex Items", "CSS Grid Intro", "CSS SASS"
];

const jsTopics = [
    "JS Introduction", "JS Where To", "JS Output", "JS Syntax", "JS Variables", "JS Operators", "JS If Conditions", "JS Loops", "JS Strings", "JS Numbers", "JS Functions", "JS Objects", "JS Scope", "JS Dates", "JS Temporal", "JS Arrays", "JS Sets", "JS Maps", "JS Iterations", "JS Math", "JS RegExp", "JS Destructuring", "JS Data Types", "JS Errors", "JS Debugging", "JS Conventions", "JS HTML DOM", "JS Events", "JS Classes", "JS Asynchronous", "JS Modules", "JS Meta & Proxy", "JS Typed Arrays", "JS DOM Navigation", "JS Windows", "JS Web APIs", "JS AJAX", "JS JSON", "JS jQuery", "JS Graphics"
];

const phpTopics = [
    "PHP Intro", "PHP Install", "PHP Syntax", "PHP Comments", "PHP Variables", "PHP Echo / Print", "PHP Data Types", "PHP Strings", "PHP Numbers", "PHP Casting", "PHP Math", "PHP Constants", "PHP Magic Constants", "PHP Operators", "PHP If...Else...Elseif", "PHP Switch", "PHP Match", "PHP Loops", "PHP Functions", "PHP Arrays", "PHP Superglobals", "PHP RegEx", "PHP Form Handling", "PHP Form Validation", "PHP Date and Time", "PHP Include", "PHP File Handling", "PHP File Open/Read", "PHP File Create/Write", "PHP File Upload", "PHP Cookies", "PHP Sessions", "PHP Filters", "PHP JSON", "PHP Exceptions", "PHP What is OOP", "PHP Classes/Objects", "PHP Constructor", "PHP Destructor", "PHP Inheritance", "PHP Abstract Classes", "PHP Interfaces", "PHP Traits", "PHP Static Methods", "PHP Namespaces", "MySQL Connect", "MySQL Create DB", "MySQL Create Table", "MySQL Insert Data", "MySQL Select Data", "MySQL Where", "MySQL Order By", "MySQL Delete Data", "MySQL Update Data", "PHP XML Parsers"
];

function generateCards(topics, langStr) {
    return topics.map(t => {
        return {
            title: t,
            desc: `Overview of ${t}`,
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add ${t} example \nconsole.log('${t}');`
        };
    });
}

// We generate string representations to avoid double-evals
function stringifyCard(card) {
    return `{
            title: "${card.title}",
            desc: "${card.desc}",
            colSpan: ${card.colSpan},
            rowSpan: ${card.rowSpan},
            code: \`${card.code}\`
        }`;
}

function process() {
    const dataJsPath = '/Users/paolopirruccio/.gemini/antigravity/scratch/portfolio/syntax-bento/data.js';
    let content = fs.readFileSync(dataJsPath, 'utf8');

    // We will find the python array and keep it, but we need to replace html, css, js, php arrays
    
    const htmlCardsStr = generateCards(htmlTopics, 'HTML').map(stringifyCard).join(',\n        ');
    const cssCardsStr = generateCards(cssTopics, 'CSS').map(stringifyCard).join(',\n        ');
    const jsCardsStr = generateCards(jsTopics, 'JavaScript').map(stringifyCard).join(',\n        ');
    const phpCardsStr = generateCards(phpTopics, 'PHP').map(stringifyCard).join(',\n        ');

    // Regular expressions to replace the arrays in the data.js file
    content = content.replace(/html: \[[\s\S]*?\],\n\s*css:/, `html: [\n        ${htmlCardsStr}\n    ],\n    css:`);
    content = content.replace(/css: \[[\s\S]*?\],\n\s*js:/, `css: [\n        ${cssCardsStr}\n    ],\n    js:`);
    content = content.replace(/js: \[[\s\S]*?\],\n\s*sql:/, `js: [\n        ${jsCardsStr}\n    ],\n    sql:`);
    content = content.replace(/php: \[[\s\S]*?\]/, `php: [\n        ${phpCardsStr}\n    ]`);

    fs.writeFileSync(dataJsPath, content, 'utf8');
    console.log("Successfully updated data.js with new topics.");
}

process();
