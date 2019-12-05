var sql = require('./db');
var con = sql();
var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyparser = require('body-parser');
var app = express();
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
    var p=0;
    var r=0;
    var i=0;
    var d=0;
    var e=0;
    con.query(`insert into cards values('${rempno}', '${rmempno}',
                '${sempno}', '${category}', '${senddate}', '${message}', '${picurl}')`, (err, result) => {
            if (err) {
                throw err;
            }
        })

    con.query(`select count(rempno) from cards where category='P' and rempno='${rempno}'`,function(error,result){
        result.forEach(element => {
            p=element['count(rempno)'];
        });
    });

    con.query(`select count(rempno) from cards where category='R' and rempno='${rempno}'`,function(error,result){
        result.forEach(element => {
            r=element['count(rempno)'];
        });
    });

    con.query(`select count(rempno) from cards where category='I' and rempno='${rempno}'`,function(error,result){
        result.forEach(element => {
            i=element['count(rempno)'];
        });
    });

    con.query(`select count(rempno) from cards where category='D' and rempno='${rempno}'`,function(error,result){
        result.forEach(element => {
            d=element['count(rempno)'];
        });
    });

    con.query(`select count(rempno) from cards where category='E' and rempno='${rempno}'`,function(error,result){
        result.forEach(element => {
            e=element['count(rempno)'];
        });
    });

    console.log("Number of P: "+p);
    console.log("Number of R: "+r);
    console.log("Number of I: "+i);
    console.log("Number of D: "+d);
    console.log("Number of E: "+e);
        
    res.send("Pride card submitted");
    
})

// router.get("/cards/home", (req, res) => {
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