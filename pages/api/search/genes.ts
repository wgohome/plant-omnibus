import type { NextApiRequest, NextApiResponse } from 'next'

import connectMongo from "../../../utils/connectMongo"
import Gene from "../../../models/gene"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).json({error: "Method not available for this endpoint"})
  }
  try {
    connectMongo()
    const { searchTerm } = req.query
    const escSearchTerm = searchTerm.replace(/[\/._-]/ig, "\\$&")
    console.log(escSearchTerm)
    const genes = await Gene.find({label: new RegExp(escSearchTerm, "i")}, "label alias").limit(10)
    res.status(200).json(genes)
  } catch (error) {
    console.log(error)
    res.status(422).json({ error: "invalid query" })
  }
}
