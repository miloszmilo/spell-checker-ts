type Corrections = {
  index: number;
  proposed_phrases: Array<string>;
};

/*
 * Number of closest words that will be returned for each word in given text
 * Default set to 3
 */
export let SUGGESTION_NUMBER: number = 3;

/*
 * Array of strings containing dictionary words, that the algorithm will calculate distance to
 * Default is empty
 */
export let WORD_DICTIONARY_ARRAY: Array<string> = [];

/*
 * Given input text as string, splits text on whitespace using regex, then calculates Levenshtein distance per each word in input and dictionary, then returns SUGGESTION_NUUMBER closest matching elements per input word
 *
 */
export function checkSpelling(text: string): Array<Array<string>> {
  if (WORD_DICTIONARY_ARRAY.length === 0) {
    throw new Error("Looks like you forgot to set WORD_DICTIONARY_ARRAY");
  }

  let words = text.split(/\s+/);
  if (words.length === 0) {
    throw new Error(`Couldn't split input text on whitespace ${words}`);
  }

  const result = words.map((w) => {
    if (WORD_DICTIONARY_ARRAY.includes(w)) return [w];

    const matches = WORD_DICTIONARY_ARRAY.map((dictw) => {
      return { distance: getLevenshteinDistance(w, dictw), word: dictw };
    });

    return matches
      .sort((a, b) => a.distance - b.distance)
      .slice(0, SUGGESTION_NUMBER)
      .map((w) => w.word);
  });
  return result;
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

WORD_DICTIONARY_ARRAY = ["bat", "link", "full", "think"];
console.log(getLevenshteinDistance("cat", "bat") === 1);
console.log(getLevenshteinDistance("zelda", "link") === 5);
console.log(getLevenshteinDistance("empty", "full") === 5);
console.log(getLevenshteinDistance("risk", "think") === 3);
console.log(checkSpelling("cat zelda empty risk"));
