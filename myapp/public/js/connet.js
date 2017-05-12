var mysql  = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    port     : '3306',
    database : 'book',
    useConnectionPooling: true
});

module.exports = connection;