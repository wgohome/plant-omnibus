import type { NextApiRequest, NextApiResponse } from 'next'

import { getGeneLabelsSearchPage } from '../../../utils/genes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      try {
        const { searchTerm, pageIndex, pageSize } = req.query
        const escSearchTerm = searchTerm.replace(/[\/._-]/ig, "\\$&")
        const parsedPageIndex = pageIndex ? parseInt(pageIndex) : 0
        const parsedPageSize = pageSize ? parseInt(pageSize) : process.env.pageSize

        const results = await getGeneLabelsSearchPage(escSearchTerm, parsedPageIndex, parsedPageSize)
        res.status(200).json(results)
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
