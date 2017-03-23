(function(island){

    island.islandCount = function(grid) {
        var length = grid.length,
            numberOfIslands = 0,
            width,
            i,
            j;

        if (length === 0) {
            return 0;
        }

        width = grid[0].length;

        if (width === 0) {
            return 0;
        }

        for (i = 0; i < length; i++) {
            for (j = 0; j < width; j++) {
                if (grid[i][j] !== 1) {
                    continue;
                }
                numberOfIslands++;
                traverse(grid, i, j, length, width);
            }
        }
        return numberOfIslands;
    };

    function traverse(grid, i, j, len, len1) {
        if (i >= len || j >= len1 || i < 0 || j < 0) {
            return;
        }

        if (grid[i][j] === 1) {
            grid[i][j] = 0;
            traverse(grid, i - 1, j, len, len1);
            traverse(grid, i, j - 1, len, len1);
            traverse(grid, i + 1, j, len, len1);
            traverse(grid, i, j + 1, len, len1);
            traverse(grid, i-1,j-1,len,len1);
            traverse(grid, i-1,j+1,len,len1);
            traverse(grid, i+1,j-1,len,len1);
            traverse(grid, i+1,j+1,len,len1);
        }
    }

})(module.exports);
