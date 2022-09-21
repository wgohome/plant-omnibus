import Species from "../models/species"
import connectMongo from "../utils/connectMongo"

export const getOneSpecies = async (taxid: number) => {
  connectMongo()
  const species = await Species.findOne({"tax": taxid}).lean()
  return species
}
