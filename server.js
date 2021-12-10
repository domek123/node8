const express = require("express");
const app = express()
const PORT = 3000;
app.use(express.static("static"))
const mongoClient = require('mongodb').MongoClient
app.use(express.json());
const opers = require("./modules/Operations.js")
let _db


app.post("/handleShowData", function (req, res) {
    mongoClient.connect(`mongodb://${req.body.s}/Wojcik_Dominik`, function (err, db) {

        if (err) {
            const data = ["error"]
            res.send(JSON.stringify(data))
            console.log("error")
        }
        else {
            db.createCollection("DefaultTable", function (err, coll) {
            })
            _db = db;
            opers.showDatas(db, function (data) {
                res.end(JSON.stringify(data));
            })
        }

    })
})

app.post("/handleShowColl", function (req, res) {
    const { s, d } = req.body
    const dbo = _db.db(d);

    opers.showColl(dbo, function (data) {
        res.end(JSON.stringify(data));
    })

})

app.post("/handleAddData", function (req, res) {
    const { s, d } = req.body
    mongoClient.connect(`mongodb://${s}/${d}`, function (err, db) {
        if (err) throw err;
        opers.addData(db)
    });

})

app.post("/handleDelData", function (req, res) {
    const { s, d } = req.body
    mongoClient.connect(`mongodb://${s}/${d}`, function (err, db) {
        if (err) throw err;
        opers.delData(db)
    });

})




app.post("/handleAddColl", function (req, res) {
    const { s, d, c } = req.body
    console.log(s, d, c)
    mongoClient.connect(`mongodb://${s}/${d}`, function (err, db) {
        if (err) throw err;
        opers.addColl(db, c)
    });

})


app.post("/handleDelColl", function (req, res) {
    const { s, d, c } = req.body
    mongoClient.connect(`mongodb://${s}/${d}`, function (err, db) {
        if (err) throw err;
        opers.delColl(db, c)
    });

})

app.listen(PORT, function () {
    console.log("serwer uruchomionu na procie " + PORT);
})