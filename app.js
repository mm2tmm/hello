var db = require("./db");
var mmScrapeLib = require("./mmScrape");
var xpath = require("./xpath");

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
                if (err) {console.log("ERROR : ",err);} else {
                    for (var i = 0; i < pages.length; i++) {
                        var page = pages[i];
                        console.log("start page : " + page.title + " url: "+page.url);

                        mmScrapeLib.getTags(page.url , function (err,tags) {
                            if (err) {console.log("getTags ERROR : ",err);}
                            else
                            {
                                let body = tags[1];

                                //tetch mofid part of page.
                                let mofid;
                                xpath.getNodes(body,page.xpath_mofid,function (err , node) {
                                    if(err){console.log("getNodes xpath_mofid ERROR : ",err);}
                                    else
                                    {
                                        mofid = node;
                                        console.log('mofid: '+mofid);

                                        //fetch parts
                                        let parts;
                                        xpath.getNodes(body,page.xpath_parts,function (err , node) {
                                            if(err){console.log("getNodes xpath_parts ERROR : ",err);}
                                            else
                                            {
                                                parts = node;
                                                console.log('parts: '+parts);

                                                //fetch parts
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });

            //end of for each site
        }
    }
});