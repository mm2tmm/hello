var db = require("./db");
var config = require("./config");
var mmScrape = require("./mmScrape");
var xpath = require("./xpath");
var url = require("./url");
var hyperlink = require("./link");

//get all sites
db.getRows('SELECT * FROM '+ config.pref +'_mcontent4_sites where published=1',function(err,sites){
    if (err) {
        console.log("ERROR : ",err);
    } else {
        for (var i = 0; i < sites.length; i++) {
            var site = sites[i];
            console.log("start site : " + site.title);


            //get all pages
            db.getRows('SELECT * FROM '+ config.pref +'_mcontent4_pages where site='+site.id ,function(err,pages){
                if (err) {console.log("ERROR : ",err);} else {
                    for (var i = 0; i < pages.length; i++)
                    {
                        var page = pages[i];
                        console.log("start page : " + page.title + " url: "+page.url);

                        mmScrape.getTags(page.url , function (err,tags) {
                            if (err) {console.log("getTags ERROR : ",err);}
                            else
                            {
                                let html = tags[0];

                                //tetch mofid part of page.
                                let mofid;
                                xpath.getNodeValue(html,page.xpath_mofid,function (err , node) {
                                    if(err){console.log("getNodes xpath_mofid ERROR : ",err);}
                                    else
                                    {
                                        mofid = node;
                                        console.log('mofid: '+mofid);

                                        //fetch parts
                                        let parts;
                                        xpath.getNodes(html,page.xpath_parts,function (err , node) {
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
                                                        xpath.getNodeValue(part.toString(), page.xpath_link_title_top,
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
                                                        xpath.getNodeValue(part.toString(), page.xpath_link_title,
                                                            function (err,title)
                                                            {
                                                                if(err){console.log("getNodes xpath_link_title ERROR : ",err);}
                                                                else {link_title = title;}
                                                            }
                                                        );
                                                    }
                                                    link_title = link_title.toString().trim();

                                                    let link_desc="";
                                                    if(page.getNodeValue != "")
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
                                                    let link_img_src_fixed ="";

                                                    url.fixUrl(link_img_src,site.urlbase,function (fixed) {
                                                        link_img_src_fixed = fixed;});

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
                                                    link_href = link_href.toString().trim();
                                                    let link_href_fixed ="";

                                                    url.fixUrl(link_href,site.urlbase,function (fixed) {
                                                        link_href_fixed = fixed;});

                                                    // console.log("title top: "+link_title_top);
                                                    console.log("title: "+link_title);
                                                    // console.log("desc: "+link_desc);
                                                    // console.log("img_src: "+link_img_src);
                                                    // console.log("img_src fixed: "+link_img_src_fixed);
                                                    // console.log("href: "+link_href);
                                                    // console.log("href fixed: "+link_href_fixed);

                                                    if(link_title!="" & link_href!="")
                                                    {
                                                        //var thisLink = new hyperlink.Link(page.catid,site.id,page.id,link_title_top,link_title,link_href_fixed,link_href_fixed,page.xpath_img_src2,link_desc,site.language);
                                                        //thisLink.fire();

                                                        // mmScrape.getTags(link_href_fixed,function (err,tags) {
                                                        //     if(err){console.log("getTags urlreal ERROR : ",err);}
                                                        //     else {
                                                        //         this.tags = tags;
                                                        //
                                                        //         console.log("GET TAGS");
                                                        //         //this.set_urlimg2();
                                                        //     }
                                                        // });
                                                        //
                                                        // setTimeout(function () {
                                                        //     console.log("1000 ms delay!");
                                                        // },10000);
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });

                        console.log("now go to next page!");
                    }
                }
            });

            //end of for each site
        }
    }
});