import GeneAnnotation from "../models/geneAnnotation";
import connectMongo from "./connectMongo";

interface InputArgs {
  type: string
  pageIndex: number
  pageSize: number
}

export const getGeneAnnotationsPage = async ({
  type,
  pageIndex = 0,
  pageSize = parseInt(process.env.pageSize),
}: InputArgs) => {
  connectMongo()
  const geneAnnotations = await GeneAnnotation.find({ type: type })
    .skip(pageIndex * pageSize)
    .limit(pageSize)
  const numGeneAnnotations = await GeneAnnotation.countDocuments({ type: type })
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
