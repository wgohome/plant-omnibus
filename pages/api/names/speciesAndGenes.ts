import type { NextApiRequest, NextApiResponse } from 'next'

import { getManyGenes } from '../../../utils/genes'
import { getManySpecies } from '../../../utils/species'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      try {
        // The raw array of {taxid, gene_label} objects
        // derived from diamond search API
        const hits = req.body
        // Call Next.js's API to get species name and _id
        const species = await getManySpecies(hits.map(hit => hit.taxid))
        // TOFIX: What happens when there is a data mismatch
        // between the diamond search db and our Mongo DB data?
        hits.forEach((hit, i) => {
          if (species[i].tax === hit.taxid) {
            hit.species_name = species[i].name
            hit.species_id = species[i]._id
          }
        })
        // Call Next.js's API to get gene's gene annotations
        // to retrieve MAPMAN annotations (if any)
        const genes = await getManyGenes(hits)
        hits.forEach((hit, i) => {
          if (genes[i].label === hit.gene_label) {
            // Find all MAPMAN annotations if any,
            // and add to the doc
            const mapman_gas = genes[i].gene_annotations.filter(ga => ga.type === "MAPMAN")
            hit.names = mapman_gas.map(ga => ga.name)
          }
        })
        res.status(200).json(hits)
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
