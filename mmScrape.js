const puppeteer = require('puppeteer');

function scrape(url, callback)
{
    let url1 = url;
    url1 = url;

    //let callback1 = callback;
    //let callback1;

    let as = async (url, callback) => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        await page.goto(url);
        await page.waitFor(1000);

        let bodyHTML = await page.evaluate(() => document.body.innerHTML);

        browser.close();

        //return bodyHTML;
        callback(bodyHTML);
    };

    //callback1 = "for test";
    ass = as(url , callback);
    return ass.then();
}


module.exports.scrape = scrape;