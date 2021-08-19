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
    "timeout":120000
};
const puppeteer = require('puppeteer')

convert();

async function convert() {
    await convertPuppeteer();
    convertHtmlPdf();
}

async function convertPuppeteer() {
    const browser = await puppeteer.launch({
        headless: true
    });

    // create a new page
    const page = await browser.newPage();

    // set your html as the pages content
    await page.setContent(html, {
        waitUntil: 'networkidle2'
    });

    // create a pdf buffer
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true ,
        landscape: true
    });

    // or a .pdf file
    await page.pdf({
        format: 'A4',
        printBackground: true,
        landscape: true,
        path: `./test2.pdf`
    });

    // close the browser
    await browser.close();
}

//<50s
function convertHtmlPdf(){
    pdf.create(html, options).toFile('./test.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
}
