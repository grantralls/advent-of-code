"use strict";
exports.__esModule = true;
var promises_1 = require("fs/promises");
(0, promises_1.readFile)('src/input.txt', 'utf-8').then(function (data) {
    var splitDataStream = data.split('');
    var answerOne = getStartOfIndex(splitDataStream, getPacket);
    console.log("Answer one: ".concat(answerOne));
    var answerTwo = getStartOfIndex(splitDataStream, getMessage);
    console.log("Answer two: ".concat(answerTwo));
});
var getStartOfIndex = function (datastream, callback) { return datastream.reduce(callback, 0); };
var getPacket = function (acc, _, currentIndex, datastream) {
    var arrayToCheck = datastream.slice(currentIndex, currentIndex + 4);
    var mySet = new Set(arrayToCheck);
    if (mySet.size === 4) {
        return currentIndex + 4;
    }
    return acc;
};
var getMessage = function (acc, _, currentIndex, datastream) {
    var arrayToCheck = datastream.slice(currentIndex, currentIndex + 14);
    var mySet = new Set(arrayToCheck);
    if (mySet.size === 14) {
        return currentIndex + 14;
    }
    return acc;
};
//# sourceMappingURL=index.js.map