import Species from "../models/species"
import Gene from "../models/gene"
import SampleAnnotation from "../models/sampleAnnotation"
import connectMongo from "../utils/connectMongo"
import { getStdDev } from "./stats"

import * as poNameMap from '/public/data/po_name_map.json' assert {type: 'json'}

export const getSampleAnnotations = async (
  taxid: number,
  geneLabel: string,
  type: string = "PO",
) => {
  connectMongo()
  const species = await Species.findOne({ "tax": taxid }, "_id")
  const gene = await Gene.findOne(
    { "spe_id": species._id, "label": geneLabel },
    "_id"
  )
  const sas = await SampleAnnotation.find({
    "spe_id": species._id,
    "g_id": gene._id,
    "type": type,
  }).lean()
  return sas
}

/*
  For a gene for a particular species,
  get the Sample Annotation doc with the highest SPM
*/
export const getHighestSpmSA = async (
  taxid: number,
  geneLabel: string,
) => {
  const sas = await getSampleAnnotations(taxid, geneLabel)
  let highestSpm = null
  if (sas.length > 0) {
    highestSpm = sas.reduce(
      (prev, curr) => prev.spm > curr.spm ? prev : curr
    )
    highestSpm.labelName = poNameMap[highestSpm.label]
  }
  return highestSpm
}

/*
  For getting additional data to be rendered on graphs
*/
export const getSampleAnnotationsGraphData = async (
  taxid: number,
  geneLabel: string,
  type: string = "PO",
) => {
  const sampleAnnotations = await getSampleAnnotations(taxid, geneLabel, type)
  sampleAnnotations.forEach(sa => {
    sa.name = poNameMap[sa.label]
    sa.tpms = sa.samples.map((sample: object): number => sample.tpm)
    sa.sd = getStdDev(sa.tpms)
    // sa.se = 0
    delete sa.samples
  })
  return sampleAnnotations
}
