var mysql = require('mysql');
let allConfig = require('./config.json');
let profile = allConfig.currentProfile;
let config = allConfig[profile];

/**
 * This module is all about connecting to the database and uses a config.json file to define
 * required parameters to connect with the databse.
 */
module.exports =
    function connection() {
        let database = config.login_database;
        var con = mysql.createConnection({
            "port": database.port,
            "host": database.host,
            "user": database.user,
            "password": database.password,
            "database": database.name
        })
        con.connect(function (err) {
            if (err) {
                throw err;
            }
            else {
                console.log("Connected to MySQL database "+database.name);
            }
        });

        return con;
    }
