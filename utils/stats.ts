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
