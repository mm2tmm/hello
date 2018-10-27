var mysql = require('mysql');
var config = require('./config');

function connect(callback)
{
    let connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    callback(connection);
}

module.exports.connect = connect;