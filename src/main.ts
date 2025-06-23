type Corrections = {
  index: number;
  proposed_phrases: Array<string>;
};

export function checkSpelling(text: string): Array<Corrections>[] {
  const words: Array<string> = text.split(/\s+/);
  const dictionary: Array<string> = new Array();
  words.map((w, i) => {
    if (dictionary.includes(w)) return;
    // Check each word for how close it maches any word
    // in dictionary
    // if it's not matching any fully
    // then give 3 closest matches
  });
  return [];
}

function getLevenshteinDistance(firstWord: string, secondWord: string): number {
  const m = firstWord.length;
  const n = secondWord.length;
  let dp: Array<Array<number>> = [];
  dp.length = m + 1;
  for (let i = 0; i < m + 1; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }
  dp = dp.map((arr, i) => {
    arr[0] = i;
    return arr;
  });
  dp[0] = dp[0].map((elem, i) => {
    elem = i;
    return elem;
  });
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      if (firstWord[i - 1] === secondWord[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        continue;
      }
      dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}

console.log(getLevenshteinDistance("cat", "bat") === 1);
console.log(getLevenshteinDistance("zelda", "link") === 5);
console.log(getLevenshteinDistance("empty", "full") === 5);
console.log(getLevenshteinDistance("risk", "think") === 3);
