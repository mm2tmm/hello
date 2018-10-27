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

                        mmScrapeLib.getTags(page.url , function (err,tags) {
                            if (err) {
                                console.log(err);
                            }
                            else
                            {
                                //tetch mofid part of page.
                                let body = tags[1];
                                console.log("body:"+body);

                                var doc = new dom().parseFromString(body)
                                var nodes = xpath.select(page.xpath_parts, doc)

                                //console.log("Node: " + nodes[0].toString())

                                var node1 = nodes[0].toString();
                                var nodes = nodes.toString();

                                console.log("mofid part of page:"+nodes);

                            }
                        });
                    }
                }
            });

            //end of for each site
        }
    }
});