var db = require("./db");
var mmScrapeLib = require("./mmScrape");
var xpath = require("./xpath");
var url = require("./url");

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
                                                //console.log('parts : '+parts);
                                                //console.log('parts length : '+parts.length);

                                                //fetch links data
                                                for (var l = 0; l < parts.length; l++)
                                                {
                                                    let part = parts[l];
                                                    console.log('part '+l+' : '+part);

                                                    let link_title_top ="";
                                                    if(page.xpath_link_title_top != "")
                                                    {
                                                        xpath.getNodes(part.toString(), page.xpath_link_title_top,
                                                            function (err,title_top)
                                                            {
                                                                if(err){console.log("getNodes xpath_link_title_top ERROR : ",err);}
                                                                else {link_title_top = title_top;}
                                                            }
                                                        );
                                                    }
                                                    link_title_top = link_title_top.toString().trim();


                                                    let link_title="";
                                                    if(page.xpath_link_title != "")
                                                    {
                                                        xpath.getNodes(part.toString(), page.xpath_link_title,
                                                            function (err,title)
                                                            {
                                                                if(err){console.log("getNodes xpath_link_title ERROR : ",err);}
                                                                else {link_title = title;}
                                                            }
                                                        );
                                                    }
                                                    link_title = link_title.toString().trim();

                                                    let link_desc="";
                                                    if(page.xpath_desc != "")
                                                    {
                                                        xpath.getNodes(part.toString(), page.xpath_desc,
                                                            function (err,desc)
                                                            {
                                                                if(err){console.log("getNodes xpath_desc ERROR : ",err);}
                                                                else {link_desc = desc;}
                                                            }
                                                        );
                                                    }
                                                    link_desc = link_desc.toString().trim();

                                                    let link_img_src="";
                                                    if(page.xpath_img_src != "")
                                                    {
                                                        xpath.getNodeValue(part.toString(), page.xpath_img_src,
                                                            function (err,img_src)
                                                            {
                                                                if(err){console.log("getNodes xpath_desc ERROR : ",err);}
                                                                else {link_img_src = img_src;}
                                                            }
                                                        );
                                                    }
                                                    link_img_src = link_img_src.toString().trim();

                                                    let link_href="";
                                                    if(page.xpath_link_href != "")
                                                    {
                                                        xpath.getNodeValue(part.toString(), page.xpath_link_href,
                                                            function (err,href)
                                                            {
                                                                if(err){console.log("getNodes xpath_desc ERROR : ",err);}
                                                                else {link_href = href;}
                                                            }
                                                        );
                                                    }
                                                    let link_href_fixed ="";

                                                    link_href = link_href.toString().trim();

                                                    url.fixUrl(link_href,
                                                        site.urlbase,
                                                        function (fixed) {
                                                        link_href_fixed = fixed;
                                                    });



                                                    console.log("title top: "+link_title_top);
                                                    console.log("title: "+link_title);
                                                    console.log("desc: "+link_desc);
                                                    console.log("img_src: "+link_img_src);
                                                    console.log("href: "+link_href);
                                                    console.log("href fixed: "+link_href_fixed);
                                                }

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