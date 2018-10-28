const puppeteer = require('puppeteer');

async function getTags(url, callback)
{
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        await page.goto(url);

        page.evaluate(_ => {
            window.scrollBy(0, document.body.scrollHeight);
        });

        await page.waitFor(500);

        //snapshot!
        //await page.screenshot({path: 'lifemag.png'});

        let html = await page.content();
        let body = await page.evaluate(() => document.body.innerHTML);
        let head = await page.evaluate(() => document.head.innerHTML);

        let tags = await [html , head , body];

        browser.close();

        callback(null,tags);

    } catch(error) {
        callback(error,null);
    }

}

module.exports.getTags = getTags;