import Species from "../models/species"
import Gene from "../models/gene"
import SampleAnnotation from "../models/sampleAnnotation"
import connectMongo from "../utils/connectMongo"

export const getSampleAnnotations = async (
  taxid: number,
  geneLabel: string,
  type: string = "PO",
) => {
  connectMongo()
  const species = await Species.findOne({"tax": taxid}, "_id")
  const gene = await Gene.findOne({"spe_id": species._id, "label": geneLabel}, "_id")
  const sas = await SampleAnnotation.find({"spe_id": species._id, "g_id": gene._id}).lean()
  return sas
}
