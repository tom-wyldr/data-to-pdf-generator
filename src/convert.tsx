// @ts-ignore
const fs = require('fs');
const pdf = require('html-pdf');
const html = fs.readFileSync('D:\\IdeaProjects\\data-to-pdf-generator\\out\\index.html', 'utf8');
const options = {
    "format":"A4" ,
    "orientation": "landscape",
    "quality": "75",
    "border": {
        "top": "38px",
        "right": "38px",
        "left": "38px",
        "bottom": "38px"
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
