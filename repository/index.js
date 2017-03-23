(function (data) {

    var database = require("./database");

    data.insertFieldPattern = function(fieldPattern, next) {
        database.getDb(function(err, db) {
            if (err) next(err, null);
            else {
                db.fieldPatterns.insert(fieldPattern, next);
            }
        });
    }

    data.getFieldPatterns = function(next) {
        database.getDb(function(err, db) {
            if (err) {
                next(err);
            } else {
                db.fieldPatterns.find(next);
            }
        });
    }

})(module.exports);