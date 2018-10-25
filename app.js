var db = require("./db");

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
                        console.log("start page : " + page.title);

                        
                        //end of each page.
                    }
                }
            });

            //end of for each site
        }
    }
});