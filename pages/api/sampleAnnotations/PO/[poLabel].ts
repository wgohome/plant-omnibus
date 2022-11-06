import type { NextApiRequest, NextApiResponse } from 'next'

import { getOrganSpecificSasByMean, getOrganSpecificSasByMedian } from '../../../../utils/sampleAnnotations'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        let { poLabel, pageIndex: pageIndexIn, pageSize: pageSizeIn, queryFilter, sortByObject: sortByStr, variant } = req.query
        const pageIndex = parseInt(pageIndexIn as string) || 0
        const pageSize = parseInt(pageSizeIn as string) || parseInt(process.env.pageSize!)
        const sortByObject = sortByStr ? JSON.parse(sortByStr as string) : {}
        const genePage = variant === "median" ?
          await getOrganSpecificSasByMedian({
            poLabel: poLabel as string,
            pageIndex,
            pageSize,
            queryFilter,
            sortByObject,
          })
        :
          await getOrganSpecificSasByMean({
            poLabel: poLabel as string,
            pageIndex,
            pageSize,
            queryFilter,
            sortByObject,
          })
        if (pageIndex < 0 || pageIndex > genePage.pageTotal) {
          res.status(422).json({
            error: `${pageIndex} is an invalid pageIndex`
          })
        }
        res.status(200).json(genePage)
      } catch (error) {
        console.log(error)
        res.status(422).json({ error: "invalid query" })
      }
      break
    default:
      console.log("Method not available for this endpoint")
      res.status(405).json({error: "Method not available for this endpoint"})
  }
}
