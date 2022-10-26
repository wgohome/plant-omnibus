import type { NextApiRequest, NextApiResponse } from 'next'

import { getGeneAnnotationsPage, getMapmanSubbinsPage } from '../../../utils/geneAnnotations'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        let { pageIndex: pageIndexIn, paegSize: pageSizeIn, queryFilter, sortByObject: sortByStr, level1Bin: level1BinIn } = req.query
        const pageIndex = parseInt(pageIndexIn as string) || 0
        const pageSize = parseInt(pageSizeIn as string) || parseInt(process.env.pageSize!)
        const sortByObject = sortByStr ? JSON.parse(sortByStr as string) : {}
        let genePage
        if (level1BinIn) {
          const level1Bin = parseInt(level1BinIn as string)
          genePage = await getMapmanSubbinsPage({
            level1Bin,
            pageIndex,
            pageSize,
            queryFilter,
            sortByObject,
          })
        } else {
          genePage = await getGeneAnnotationsPage({
            type: "MAPMAN",
            pageIndex,
            pageSize,
            queryFilter,
            sortByObject,
          })
        }
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
