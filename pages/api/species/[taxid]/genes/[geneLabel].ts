import type { NextApiRequest, NextApiResponse } from 'next'

import { getSampleAnnotations } from '../../../../../utils/sampleAnnotations'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).json({error: "Method not available for this endpoint"})
  }
  try {
    let { taxid, geneLabel } = req.query
    taxid = parseInt(taxid)
    const sas = await getSampleAnnotations(taxid, geneLabel)
    res.status(200).json(sas)
  } catch (error) {
    console.log(error)
    res.status(422).json({ error: "invalid query" })
  }
}
