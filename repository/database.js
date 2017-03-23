(function(database) {

    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/islandCounter";
    var theDb = null;
    database.getDb = function(next) {
        if (!theDb) {
            mongodb.MongoClient.connect(mongoUrl,
                function(err, db) {
                    if (err) {
                        next(err, null);
                    } else {
                        theDb = {
                            db: db,
                            fieldPatterns: db.collection("fieldPatterns")
                        };
                        next(null, theDb);
                    }
                });
        } else {
            next(null, theDb);
        }
    }

})(module.exports);