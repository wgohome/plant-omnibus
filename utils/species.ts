import SampleAnnotation from "../models/sampleAnnotation"
import SampleAnnotationEntity from "../models/sampleAnnotationEntity"
import Species from "../models/species"
import connectMongo from "../utils/connectMongo"

export const getOneSpecies = async (taxid: number) => {
  connectMongo()
  const species = await Species.findOne({"tax": taxid}).lean()
  return species
}

/*
  For protein seq search results
  From an array of taxid,
  return species name
*/
export const getManySpecies = async (
  taxids: number[]
) => {
  connectMongo()
  const results = Promise.all(
    taxids.map(async (taxid) => {
      return await Species.findOne({ tax: taxid }, "_id tax name").lean()
    })
  )
  return results
}

export const getAllSpecies = async () => {
  connectMongo()
  const species = Species.find().lean()
  return species
}

export const getSpeciesHavingOrgan = async (poTerm: string) => {
  connectMongo()
  // TOO SLOW
  // const species = await SampleAnnotation.aggregate([
  //   {
  //     "$match": {
  //       type: "PO",
  //       label: poTerm,
  //     }
  //   },
  //   {
  //     "$group": {
  //       "_id": "$spe_id",
  //     }
  //   },
  //   {
  //     "$lookup": {
  //       from: "species",
  //       localField: "_id",
  //       foreignField: "_id",
  //       as: "annotatedSpecies",
  //     }
  //   },
  //   {
  //     "$unwind": {
  //       path: "$annotatedSpecies"
  //     }
  //   },
  //   {
  //     "$project": {
  //       tax: "$annotatedSpecies.tax",
  //       name: "$annotatedSpecies.name",
  //     }
  //   },
  // ])
  const saEntity = await SampleAnnotationEntity.findOne(
    { type: "PO", label: poTerm }
  )
    .populate("spe_ids")
    .lean()
  return saEntity.spe_ids.map(entity => ({
    _id: entity._id,
    tax: entity.tax,
    name: entity.name,
  }))
}
