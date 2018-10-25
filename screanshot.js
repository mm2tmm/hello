const puppeteer = require('puppeteer');

async function getPic() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1024, height: 10000})

    //https://www.ninisite.com
    //http://lifemag.ir/
    //http://koolakmag.ir/

    //browser.on('targetdestroyed', async ()
    //    => console.log('Target destroyed. Pages count: ' +
    //   (await browser.pages()).length));
    await page.goto('http://lifemag.ir/');
    page.evaluate(_ => {
        window.scrollBy(0, document.body.scrollHeight);
        //window.scrollBy(0, 3000);
    });

    //delay for load images of site
    await page.waitFor(3000);

    await page.screenshot({path: 'lifemag.png'});


    await browser.close();
}

getPic();