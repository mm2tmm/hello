
function fixUrl(url,urlBase,callback)
{
    var urlHasUrlBase = url.includes(urlBase);

    let newUrl = url;

    if(!urlHasUrlBase & url.substr(0,4)!=="http" & url !== '' & url !== '/' & url !== '*')
    {
        //relative
        if(url.substr(0,1)==="/")
        {
            //start whith /
            newUrl = "http://" + urlBase + url;
        }
        else
        {
            newUrl = "http://" + urlBase + url;
        }
    }
    callback(newUrl);
}

module.exports.fixUrl = fixUrl;