/*
 * 算法参考:
 * http://ccl.pku.edu.cn/doubtfire/Course/Computational%20Linguistics/contents/Minimum%20Edit%20Distance.pdf
 * */
var INSERT_COST = 1;
var REPLACE_COST = 2;
var DELETE_COST = 1;

module.exports = function (t, s) {
    var targetLen = t.length;
    var sourceLen = s.length;
    var d = createMatrix();
    return calc();

    function calc() {
        var i = j = 1;
        while(i <= targetLen) {
            j = 1;
            while(j <= sourceLen) {
                d[i][j] = getMinDistance(i, j);
                j++;
            }
            i++;
        }
        var rate = 1 - d[targetLen][sourceLen] / Math.max(targetLen, sourceLen);
        if (rate < 0) {
            rate = 0;
        }
        rate = parseInt(rate * 100, 10) / 100;
        return rate;
    }
    function getMinDistance(i, j) {
        var replaceCost = REPLACE_COST;
        var insertCost = INSERT_COST;
        var delCost = DELETE_COST;

        //因为Matrix里的1，对应字符串的0，计算要减一和字符串位置对应
        if (t[i - 1] === s[j - 1]) {
            replaceCost = 0;
        }
        return Math.min(d[i - 1][j] + insertCost, d[i - 1][j - 1] + replaceCost, d[i][j - 1] + delCost);
    }
    function createMatrix() {
        var matrix = []; 
        var i, j;
        i = 0;
        while(i <= targetLen) {
            j = 0;
            matrix[i] = [];
            while(j <= sourceLen) {
                if (i === 0) {
                    matrix[i][j] = j * DELETE_COST;
                } 
                if (j === 0) {
                    matrix[i][j] = i * INSERT_COST;
                } 
                j++;
            }
            i++;
        }
        return matrix;
    }
}
