var mysql = require('mysql');

module.exports = 
function connection(){
var con = mysql.createConnection({
    "port": "3306",
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "groupproject"
})
con.connect(function(err) {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected to MySQL database.");
    }
});

return con;
}
