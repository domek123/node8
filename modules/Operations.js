module.exports = {


    showDatas: function (db, callback) {
        db.admin().listDatabases(function (err, dbs) {
            if (err) console.log(err)
            else {
                const data = dbs.databases.filter(e => {
                    if (e.name != "admin" && e.name != "local" && e.name != "config")
                        return e.name
                })
                callback(data)
            }
        })
    },


    showColl: function (db, callback) {
        db.listCollections().toArray(function (err, dbs) {
            if (err) console.log(err)
            else {
                const data = dbs.map(element => {
                    return element.name
                });
                callback(data)
            }

        })
    },


    addData: function (db) {
        db.createCollection("DefaultTable", function (err, coll) {
        })
    },



    delData: function (db) {
        db.dropDatabase(function (err, result) {
            if (err) throw err;
            db.close();
        })
    },


    addColl: function (db, c) {
        db.createCollection(c, function (err, coll) {
        })

    },



    delColl: function (db, c) {
        db.collection(c).drop();

    },

}