// @ts-ignore
const fs = require('fs');
const pdf = require('html-pdf');
const html = fs.readFileSync('D:\\IdeaProjects\\data-to-pdf-generator\\out\\index.html', 'utf8');
const options = {
    "format":"A4" ,
    "orientation": "landscape",
    "quality": "100",
    "border": {
        "top": "0px",
        "right": "38px",
        "left": "38px",
        "bottom": "0px"
    },
    "type":"pdf",
    "timeout": 120000
};
const puppeteer = require('puppeteer')

convert();

async function convert() {
    await convertPuppeteer();
    //convertHtmlPdf();
}

//20s to gen html + 20s to gen 230p
async function convertPuppeteer() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.setContent(html, {
        waitUntil: ['domcontentloaded', 'networkidle2'],
        timeout: 120000
    });
    await page.pdf({
        format: 'A4',
        printBackground: true,
        landscape: true,
        path: `./test2.pdf`,
    });
    await browser.close();
    console.log('Puppeteer export is successful.');
}

//20s to gen html + 30s to gen 230p
function convertHtmlPdf(){
    pdf.create(html, options).toFile('./test.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
}
