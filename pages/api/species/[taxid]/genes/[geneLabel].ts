import type { NextApiRequest, NextApiResponse } from 'next'

import { getSampleAnnotations } from '../../../../../utils/sampleAnnotations'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    let { taxid, geneLabel } = req.query
    taxid = parseInt(taxid)
    console.log(taxid)
    const sas = await getSampleAnnotations(taxid, geneLabel)
    res.status(200).json(sas)
}
