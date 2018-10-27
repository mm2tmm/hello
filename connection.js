var mysql = require('mysql');

function connect(callback) {
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "engine"
    });
    callback(connection);
}

module.exports.connect = connect;