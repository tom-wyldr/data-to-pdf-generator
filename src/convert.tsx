// @ts-ignore
const fs = require('fs');
const os = require('os');
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
    await fs.writeFile(os.tmpdir() + `\\recipeApp\\out\\${Date.now()}result.pdf`,'',(err) => {
        if (err) throw err;
        console.log('File is created successfully.');
    });
    await page.pdf({
        format: 'A4',
        printBackground: true,
        landscape: true,
        path: os.tmpdir() + `\\recipeApp\\out\\${Date.now()}result.pdf`,
    });
    await browser.close();
    console.log('Puppeteer export is successful.');
}
