// @ts-ignore
const fs = require('fs');
const html = fs.readFileSync('D:\\IdeaProjects\\data-to-pdf-generator\\out\\index.html', 'utf8');
const puppeteer = require('puppeteer')

convert();

async function convert() {
    await convertPuppeteer();
}

//20s to gen html + 20s to gen 230p
async function convertPuppeteer() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.setContent(html, {
        waitUntil: ['domcontentloaded', 'networkidle2', 'networkidle0', 'load'],
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
