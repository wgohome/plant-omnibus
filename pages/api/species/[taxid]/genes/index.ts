import type { NextApiRequest, NextApiResponse } from 'next'

import { getGenesPage } from '../../../../../utils/genes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      try {
        let { taxid, pageIndex, pageSize } = req.query
        taxid = parseInt(taxid)
        pageIndex = parseInt(pageIndex) || 0
        pageSize = parseInt(pageSize) || process.env.pageSize

        const genePage = await getGenesPage(taxid, pageIndex, pageSize)
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
      break;
    default:
      console.log("Method not available for this endpoint")
      res.status(405).json({error: "Method not available for this endpoint"})
  }
}
