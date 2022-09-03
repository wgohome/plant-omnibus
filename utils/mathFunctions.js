// This JS file contains a list of helper functions that are used in the
// generation of the gene expression plots:

// Finds the cutoffs for outliers using the
// Q1 - (1.5 * IQR) and the Q3 + (1.5 * IQR) cutoff.
function outlierCutoffs(numbers) {
  let sorted = numbers.sort(function(n, m){return n - m});
  console.log(sorted)
  let firstQuartile = sorted[Math.floor(0.25 * sorted.length)]
  let thirdQuartile = sorted[Math.floor(0.75 * sorted.length)]
  let iqr = thirdQuartile - firstQuartile;

  return [(firstQuartile - iqr), (thirdQuartile + iqr)];
}

// Removes the outliers - this function is dependent on
// outlietCutoffs()
function removeOutliers(numbers) {
  let values = outlierCutoffs(numbers), lower = values[0], higher = values[1];
  let newData = [];

  for (let i = 0 ; i < numbers.length ; i++) {
    if (numbers[i] >= lower && numbers[i] <= higher) {
      newData.push(numbers[i])
    }
  }
  return newData;
}

export { outlierCutoffs, removeOutliers }
