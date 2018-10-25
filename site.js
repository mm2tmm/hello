//
// changed for test git
var mysql = require('mysql');
var connection = require("./connection");


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

