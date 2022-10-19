import { mean, quantileSeq } from "mathjs"

export const roundDecimal = (value: number, decimalPoints: number = 3): number => {
  if (!decimalPoints || !Number.isInteger(decimalPoints)) {
    console.warn("decimalPoints must be an integer")
    decimalPoints = decimalPoints ? Math.round(decimalPoints) : 3
  }
  if (decimalPoints <= 0) return value
  const multiplier = Math.pow(10, parseInt(decimalPoints))
  return Math.round(value * multiplier) / multiplier
}

export const getStdDev = (values: number[]): number => {
  if (values.length == 0) { return 0 }
  const mean: number = values.reduce((prev, curr) => prev + curr, 0) / values.length
  const errSq: number[] = values.map(val => Math.pow((val - mean), 2))
  const variance: number = errSq.reduce((prev, curr) => prev + curr, 0) / values.length
  const rawStdDev: number = Math.sqrt(variance)
  return roundDecimal(rawStdDev, 3)
}

/* Because mathjs doesnt implement linear method ... */
export const getLinearQuartiles = (values: number[]): [number, number, number] => {
  values.sort((a, b) => a - b)
  if (values.length === 0) return [0, 0, 0]
  if (values.length === 1) return [values[0], values[0], values[0]]
  if (values.length === 2) return [values[0], (values[0] + values[1]) / 2, values[1]]
  if (values.length === 3) return [values[0], values[1], values[2]]

  const n = values.length
  const q2Index = Math.floor(n / 2)
  /* q2Index also = number of elements on each side, whether n is even or odd */
  const q1Index = Math.floor(q2Index / 2)
  const q3Index = q1Index + q2Index
  let q1, q2, q3
  if (n % 2 === 0) {
    q2 = (values[q2Index - 1] + values[q2Index]) / 2
    if (q2Index % 2 === 0) { /* Guaranteed: n is even */
      q1 = (values[q1Index - 1] + values[q1Index]) / 2
      q3 = (values[q3Index - 1] + values[q3Index]) / 2
    } else { /* q2Index % 2 === 0 */
      q1 = values[q1Index]
      q3 = values[q3Index]
    }
  } else { /* n % 2 === 1 */
    q2 = values[q2Index]
    if (q2Index % 2 === 0) {
      q1 = (values[q1Index - 1] + values[q1Index]) / 2
      q3 = (values[q3Index] + values[q3Index + 1]) / 2
    } else { /* q2Index % 2 === 1 */
      q1 = values[q1Index]
      q3 = values[q3Index + 1]
    }
  }
  return [ q1, q2, q3 ]
}

/*
  Return [ bottomWhisker, topWhisker ]
*/
export const getWhiskers = (values: number[]): [number, number] => {
  if (values.length == 0) { return [ 0, 0 ] }
  // const [ q1, q2, q3 ] = quantileSeq(values, [ 0.25, 0.5, 0.75 ], false)
  const [ q1, q2, q3 ] = getLinearQuartiles(values)
  const iqr = q3 - q1
  let topWhisker = q3 + 1.5 * iqr
  // Top whisker as the highest point below q3 + iqr
  const points = values.filter(tpm => tpm > q3 && tpm <= topWhisker)
  if (points.length > 0) {
    topWhisker = Math.max(...points)
  } else {
    topWhisker = q3
  }
  // Bottom whisker doesn't matter for now
  const bottomWhisker = Math.max(0, q1 - iqr)
  return [ bottomWhisker, topWhisker ]
}
