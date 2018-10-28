var db = require("./db");
var config = require("./config");
var mmScrape = require("./mmScrape");
var xpath = require("./xpath");
var url = require("./url");

class Link{

//insert true link to db
//true --> 1:not dublicat  2:scrape for high image and tags.

//var catid,siteid,pageid,title_top,title,urlreal,urlimg,xpath_img_src2,description,language;
//obtain these:
//var urlimg2,tags,alias;

constructor (catid,siteid,pageid,title_top,title,urlreal,urlimg,xpath_img_src2,description,language) {
    this.catid = catid;
    this.siteid = siteid;
    this.pageid = pageid;
    this.title_top = title_top;
    this.title = title;
    this.urlreal = urlreal;
    this.urlimg = urlimg;
    this.description = description;
    this.language = language;
    this.xpath_img_src2 = xpath_img_src2;
}

 set_tags() {
    mmScrape.getTags(this.urlreal,function (err,tags) {
        if(err){console.log("getTags urlreal ERROR : ",err);}
        else {
            this.tags = tags;

            //this.set_urlimg2();
        }
    });
}
 set_urlimg2() {
    let html = this.tags[0];

    xpath.getNodeValue(html,this.xpath_img_src2,function (err,nodeValue) {
        if(err){console.log("getNodeValue xpath_img_src2 ERROR : ",err);}
        else {
            this.urlimg2 = nodeValue;
        }
    });
}

//function fire(callback)
 fire()
{
    if(!this.checkDublicate())
    {
        this.set_tags();

        //setTimeout(this.set_urlimg2(),7000);

        //this.set_urlimg2();

        //console.log("finish fire this link.");
    }
}

 checkDublicate()
{
    var dublicated = false;
    var query="select * from "+config.pref+"_mcontent4_links where (url_real='"+
        this.urlreal+"') or (title='"+this.title+"')";
    db.getRows(query,function (result) {
        if(result) dublicated=true;
    })
    return dublicated;
}
}

module.exports.Link = Link;
//module.exports.fire = fire;
