var mysql = require('mysql');
//var connection = require("./connection");


//try seperate connection

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "engine"
});

function getRows(q,callback)
{
    connection.query(q,
        function(err, result)
        {
            if (err)
                callback(err,null);
            else
                callback(null,result);

        }
    );
}

module.exports.getRows = getRows;

