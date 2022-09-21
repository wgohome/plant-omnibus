import type { NextApiRequest, NextApiResponse } from 'next'

import { getSampleAnnotations } from '../../../../../../utils/sampleAnnotations'
import { getStdDev } from '../../../../../../utils/stats'
import * as poNameMap from '../../../../../../public/data/po_name_map.json' assert {type: 'json'}

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
    const sampleAnnotations = await getSampleAnnotations(taxid, geneLabel)
    const xValues = sampleAnnotations.map(sa => sa.label)
    const organNames = xValues.map(po_term => poNameMap[po_term])
    const yValues = sampleAnnotations.map(sa => sa.avg_tpm)
    const tpms = sampleAnnotations.map(sa => sa.samples.map(sample => sample.tpm))
    const stdDevValues = tpms.map(getStdDev)

    res.status(200).json({
      xValues,
      yValues,
      stdDevValues,
      organNames,
    })
  } catch (error) {
    console.log(error)
    res.status(422).json({ error: "invalid query" })
  }
}
