import { median } from "mathjs"

import Species from "../models/species"
import Gene from "../models/gene"
import SampleAnnotation from "../models/sampleAnnotation"
import connectMongo from "../utils/connectMongo"
import { getStdDev, getWhiskers } from "./stats"

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
  Avoid calling the DB a second time
*/
interface SortableSA {
  spm: number
}

export const findTopSpmSA = (sampleAnnotations: SortableSA[], n: number = 3): SortableSA[] => {
  return [...sampleAnnotations].sort((sa1, sa2) => sa2.spm - sa1.spm).slice(0, n)
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
    sa.median = Math.round(median(sa.tpms) * 1000) / 1000
    sa.topWhisker = getWhiskers(sa.tpms)[1]
    delete sa.samples
  })
  return sampleAnnotations
}

/*
  For getting most specific genes for a SA (organ)
*/
interface organSpecificSasInputArgs {
  poLabel: string
  pageIndex?: number
  pageSize?: number
  queryFilter?: string | null
  sortByObject?: object
}

export const getOrganSpecificSasByMedian = async ({
  poLabel,
  pageIndex = 0,
  pageSize = parseInt(process.env.pageSize!),
  queryFilter = null,
  sortByObject,
}: organSpecificSasInputArgs) => {
  connectMongo()
  // const queryObject = { type: "PO", label: poLabel }
  // if (queryFilter) {
  //   queryObject["$or"] = [
  //     { name: { "$regex": new RegExp(queryFilter), "$options": "i" } },
  //     { label: { "$regex": new RegExp(queryFilter), "$options": "i" } },
  //   ]
  // }
  const sas = await SampleAnnotation.find({
    type: "PO",
    label: poLabel,
  })
    .sort({ spm_med: -1 })
    .skip(pageIndex * pageSize)
    .limit(pageSize)
    .populate({
      path: "species",
      select: "name tax",
    })
    .populate({
      path: "gene",
      model: "Gene",
      select: "label ga_ids",
      populate: {
        path: "mapman_annotations",
      },
    })
    .lean()
  const numSas = await SampleAnnotation.countDocuments({
    type: "PO",
    label: poLabel,
  })
  const pageTotal = Math.ceil(0.2 * numSas / pageSize)
  return {
    pageTotal,
    numSas,
    sas,
  }
}


export const getOrganSpecificSasByMean = async ({
  poLabel,
  pageIndex = 0,
  pageSize = parseInt(process.env.pageSize!),
  queryFilter = null,
  sortByObject,
}: organSpecificSasInputArgs) => {
  connectMongo()
  // const queryObject = { type: "PO", label: poLabel }
  // if (queryFilter) {
  //   queryObject["$or"] = [
  //     { name: { "$regex": new RegExp(queryFilter), "$options": "i" } },
  //     { label: { "$regex": new RegExp(queryFilter), "$options": "i" } },
  //   ]
  // }
  const sas = await SampleAnnotation.find({
    type: "PO",
    label: poLabel,
  })
    .sort({ spm: -1 })
    .skip(pageIndex * pageSize)
    .limit(pageSize)
    .populate({
      path: "species",
      select: "name tax",
    })
    .populate({
      path: "gene",
      model: "Gene",
      select: "label ga_ids",
      populate: {
        path: "mapman_annotations",
      },
    })
    .lean()
  const numSas = await SampleAnnotation.countDocuments({
    type: "PO",
    label: poLabel,
  })
  const pageTotal = Math.ceil(0.2 * numSas / pageSize)
  return {
    pageTotal,
    numSas,
    sas,
  }
}
