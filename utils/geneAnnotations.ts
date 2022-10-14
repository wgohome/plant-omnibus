import GeneAnnotation from "../models/geneAnnotation";
import connectMongo from "./connectMongo";

interface InputArgs {
  type: string
  pageIndex: number
  pageSize: number
  queryFilter?: string | null
}

export const getGeneAnnotationsPage = async ({
  type,
  pageIndex = 0,
  pageSize = parseInt(process.env.pageSize!),
  queryFilter = null,
}: InputArgs) => {
  connectMongo()
  const queryObject = { type: type }
  if (queryFilter) {
    queryObject.name = { "$regex": new RegExp(queryFilter), "$options": "i" }
  }
  const geneAnnotations = await GeneAnnotation.find(queryObject)
    .skip(pageIndex * pageSize)
    .limit(pageSize)
  const numGeneAnnotations = await GeneAnnotation.countDocuments(queryObject)
  /*
    NOTE: pageTotal is the number of pages required for the given pageSize,
    which is then needed by react-table's useTable() hook
  */
  const pageTotal = Math.ceil(numGeneAnnotations / pageSize)
  return {
    geneAnnotations: geneAnnotations,
    pageTotal: pageTotal,
  }
}

export const getOneGeneAnnotation = async ({ type, label }) => {
  connectMongo()
  const geneAnnotation = await GeneAnnotation.findOne({ type: type, label: label})
    .populate({
      path: "gene_annotation_buckets",
      select: "ga_id tax gene_ids",
      populate: [
        {
          path: "species",
          model: "Species",
          select: "name taxid"
        },
        {
          path: "genes",
          model: "Gene",
          select: "label",
        }
      ],
    })
    .lean()
  return geneAnnotation
}
