// @ts-ignore
const fs = require('fs');
const pdf = require('html-pdf');
const html = fs.readFileSync('D:\\IdeaProjects\\data-to-pdf-generator\\out\\index.html', 'utf8');
const options = {
    "format":"A4" ,
    "orientation": "landscape",
    "quality": "75",
    "border": {
        "top": "0.5in",
        "right": "1in",
        "left": "1in"
    },
    "type":"pdf",
    "timeout":120000
};

convert();

function convert() {
    pdf.create(html, options).toFile('./test.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
}
//<50s
