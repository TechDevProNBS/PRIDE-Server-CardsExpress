var express = require('express');
var session = require('express-session');
var app = express();
var sql = require('./db');
var con = sql();
var router = express.Router();
var bodyparser = require('body-parser');
var cors = require('cors');

app.use(session({ secret: "secrets" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

router.get("/home", (req, res) => {
    con.query(`SELECT * FROM cards ORDER BY senddate DESC LIMIT 24`, (err, result, fields) => {
        console.log(result);
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    })
})

router.get("/you", (req, res) => {
    var empno = req.body.empno;
    con.query(`select * from cards where rempno='${empno}'`, (err, result, fields) => {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    })
})

router.post("/new", (req, res) => {
    var rempno = req.body.rempno;
    var rmempno = req.body.rmempno;
    var sempno = req.body.sempno;
    var category = req.body.category;
    var senddate = req.body.senddate;
    var message = req.body.message;
    var picurl = req.body.picurl;
    con.query(`insert into cards values('${rempno}', '${rmempno}',
                '${sempno}', '${category}', '${senddate}', '${message}', '${picurl}')`), (err, result) => {
            if (err) {
                throw err;
            }
        }
    res.send("Pride card submitted");
    res.end();
})

// router.get("/home", (req, res) => {
//     con.query(`SELECT * FROM cards WHERE YEAR(senddate) = YEAR(CURRENT_DATE)
//      AND MONTH(senddate) = MONTH(CURRENT_DATE)`, (err, result, fields) => {
//         console.log(result);
//         if (err) {
//             throw err;
//         }
//         else {
//             res.send(result);
//         }
//     })
// })

module.exports = router