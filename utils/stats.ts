import { quantileSeq } from "mathjs"

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

/*
  Return [ topWhisker, bottomWhisker ]
*/
export const getWhiskers = (values: number[]): [number, number] => {
  if (values.length == 0) { return [ 0, 0 ] }
  const [ q1, q2, q3 ] = quantileSeq(values, [ 0.25, 0.5, 0.75 ], false)
  const iqr = q3 - q1
  const topWhisker = q3 + iqr
  const bottomWhisker = Math.max(0, q1 - iqr)
  // TODO: Can be more specific by giving the whisker as the highest point below q3 + iqr
  return [ bottomWhisker, topWhisker ]
}
