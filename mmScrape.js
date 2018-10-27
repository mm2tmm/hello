const puppeteer = require('puppeteer');

async function getHtml(url, callback)
{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitFor(1000);

    let bodyHTML = await page.evaluate(() => document.body.innerHTML);

    browser.close();

    //return bodyHTML;
    callback(bodyHTML);
}

module.exports.getHtml = getHtml;