var mysql = require('mysql');
var connection = require("./connection");

function getRows(myQuery,callback)
{
     connection.connect(function (con) {
         con.query(myQuery,
             function(err, result)
             {
                 if (err)
                     callback(err,null);
                 else
                     callback(null,result);
             }
         );
    });
}

module.exports.getRows = getRows;

