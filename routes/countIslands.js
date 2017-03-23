var express = require('express');
var router = express.Router();
var island = require('../service/island');
var data = require("../repository");

router.post('/countIslands', function(req, res,next) {
    var gridObj = req.body;

    var grid = new Array();
    var i,j,value;
    for(i = 0; i<gridObj.rows; i++){
        grid[i] = new Array();
        for(j=0;j<gridObj.columns;j++){
            value = 0;
            if(gridObj[i.toString()+j.toString()].toLowerCase()==='l') value=1;
            if(gridObj[i.toString()+j.toString()].toLowerCase()==='w') value=0;
            grid[i][j] = Number(value);
        }
    }

    data.insertFieldPattern(gridObj,
        function(err) {
            if (err) {
                console.log('saving to db failed');
            } else {
                console.log('successfully stored to db');
            }
        });

    res.send(201,island.islandCount(grid));

});
module.exports = router;