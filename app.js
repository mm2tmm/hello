var db = require("./db");
const puppeteer = require('puppeteer');
var xpath = require('xpath')
    , dom = require('xmldom').DOMParser;

var mmScrapeLib = require("./mmScrape");

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

                        var body1 ="temp body1 init";
                        var body2 ="temp body2 init";

                        body2 = mmScrapeLib.scrape(page.url , body1);
                        console.log("body1 from mmScrape : " + body1);

                        console.log("body2 from mmScrape : " + body2);
                        //     .then((value) => {
                        //     console.log(value); // Success!
                        // });

                        // scrape(page.url , page.xpath_parts).then((value) => {
                        //     console.log(value); // Success!
                        // });

                        //end of each page.
                    }
                }
            });

            //end of for each site
        }
    }
});