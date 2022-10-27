import type { NextApiRequest, NextApiResponse } from 'next'

import { getGenesPage } from '../../../../../utils/genes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      try {
        let { taxid: taxidIn, pageIndex: pageIndexIn, pageSize: pageSizeIn, queryFilter, sortByObject: sortByStr } = req.query
        const taxid = parseInt(taxidIn as string)
        const pageIndex = parseInt(pageIndexIn as string) || 0
        const pageSize = parseInt(pageSizeIn as string) || parseInt(process.env.pageSize!)
        const sortByObject = sortByStr ? JSON.parse(sortByStr as string) : {}

        const genePage = await getGenesPage({ taxid, pageIndex, pageSize, queryFilter, sortByObject })
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
