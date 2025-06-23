"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSpelling = checkSpelling;
function checkSpelling(text) {
    const words = text.split(/\s+/);
    const dictionary = new Array();
    words.map((w, i) => {
        if (dictionary.includes(w))
            return;
        // Check each word for how close it maches any word
        // in dictionary
        // if it's not matching any fully
        // then give 3 closest matches
    });
    return [];
}
function getLevenshteinDistance(firstWord, secondWord) {
    const m = firstWord.length;
    const n = secondWord.length;
    const dp = [];
    dp.length = m + 1;
    const row = [];
    row.length = n + 1;
    row.fill(0);
    dp.fill(row);
    // dp.map((arr, i) => {
    //   arr[0] = i;
    //   return arr;
    // });
    // dp[0].map((elem, i) => {
    //   elem = i;
    //   return elem;
    // });
    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = i;
    }
    for (let i = 0; i < dp[0].length; i++) {
        dp[0][i] = i;
    }
    for (let i = 0; i < m + 1; i++) {
        for (let j = 0; j < n + 1; j++) {
            if (firstWord[i - 1] === secondWord[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
                continue;
            }
            dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
        }
    }
    return dp[-1][-1];
}
console.log(getLevenshteinDistance("cat", "bat") === 1);
console.log(getLevenshteinDistance("zelda", "link") === 5);
console.log(getLevenshteinDistance("empty", "full") === 5);
console.log(getLevenshteinDistance("full", "empty") === 4);
