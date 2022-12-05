import type { NextApiRequest, NextApiResponse } from 'next'

import { getOneGeneById } from '../../../../utils/genes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      try {
        const { geneId } = req.query
        const result = await getOneGeneById(geneId)
        res.status(200).json(result)
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
