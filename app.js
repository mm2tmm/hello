var site = require("./site");

site.getAllSites(function(err,data){
    if (err) {
        // error handling code goes here
        console.log("ERROR : ",err);
    } else {
        // code to execute on data retrieval
        console.log("result from db is : ",data);
    }
});