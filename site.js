var mysql = require('mysql');
//var connection = require("./connection");

//var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "engine"
});

function getAllSites(callback)
{
    connection.query('SELECT * FROM mm_mcontent4_sites where published=1',
        function(err, result)
        {
            if (err)
                callback(err,null);
            else
                callback(null,result[0]);

        }
    );
}

module.exports.getAllSites = getAllSites;

