var site = require("./db");

site.getRows('SELECT * FROM mm_mcontent4_sites where published=1',function(err,data){
    if (err) {
        // error handling code goes here
        console.log("ERROR : ",err);
    } else {
        // code to execute on data retrieval
        console.log("result from db is : ",data);
    }
});