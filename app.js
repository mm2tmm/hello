var db = require("./db");
const puppeteer = require('puppeteer');
var xpath = require('xpath')
    , dom = require('xmldom').DOMParser;


let scrape = async (url,xpathStr) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitFor(1000);

    let bodyHTML = await page.evaluate(() => document.body.innerHTML);

    var doc = new dom().parseFromString(bodyHTML)
    var nodes = xpath.select(xpathStr, doc)

    //console.log("Node: " + nodes[0].toString())

    var node1 = nodes[0].toString();
    var nodes = nodes.toString();


    // const text = await page.evaluate((xpathStr) => {
    //     const featureArticle = document
    //         .evaluate(
    //             xpathStr,
    //             document,
    //             null,
    //             XPathResult.FIRST_ORDERED_NODE_TYPE,
    //             null
    //         )
    //         .singleNodeValue;
    //
    //     return featureArticle;
    // });


    browser.close();
    return node1;
};

//get all sites
db.getRows('SELECT * FROM mm_mcontent4_sites where published=1',function(err,sites){
    if (err) {
        console.log("ERROR : ",err);
    } else {
        for (var i = 0; i < sites.length; i++) {
            var site = sites[i];
            console.log("start site : " + site.title);


            //get all pages
            db.getRows('SELECT * FROM mm_mcontent4_pages where site='+site.id ,function(err,pages){
                if (err) {
                    console.log("ERROR : ",err);
                } else {
                    for (var i = 0; i < pages.length; i++) {
                        var page = pages[i];
                        console.log("start page : " + page.title + " url: "+page.url);

                        scrape(page.url , page.xpath_parts).then((value) => {
                            console.log(value); // Success!
                        });

                        //end of each page.
                    }
                }
            });

            //end of for each site
        }
    }
});