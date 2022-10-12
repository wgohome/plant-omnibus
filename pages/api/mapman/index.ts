import type { NextApiRequest, NextApiResponse } from 'next'

import { getGeneAnnotationsPage } from '../../../utils/geneAnnotations'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        let { pageIndex, pageSize } = req.query
        pageIndex = parseInt(pageIndex) || 0
        pageSize = parseInt(pageSize) || parseInt(process.env.pageSize)
        const genePage = await getGeneAnnotationsPage({
          type: "MAPMAN",
          pageIndex,
          pageSize,
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
