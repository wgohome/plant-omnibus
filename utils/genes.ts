import Species from "../models/species"
import Gene from "../models/gene"
import connectMongo from "../utils/connectMongo"

export const getGenesPage = async (
  taxid: number,
  pageIndex: number,
  pageSize: number = parseInt(process.env.pageSize),
) => {
  connectMongo()
  const species = await Species.findOne({"tax": taxid}, "_id")
  const species_id = species._id
  const genes = await Gene.find({"spe_id": species_id})
    .skip(pageIndex * pageSize)
    .limit(pageSize)
  const numGenes = await Gene.countDocuments({"spe_id": species_id})
  /*
    NOTE: pageTotal is the number of pages required for the given pageSize,
    which is then needed by react-table's useTable() hook
  */
  const pageTotal = Math.ceil(numGenes / pageSize)
  return {
    pageIndex: pageIndex,
    pageTotal: pageTotal,
    numGenes: numGenes,
    genes: genes,
  }
}

export const getGenesSearchPage = async (
  searchTerm: string,
  pageIndex: number = 0,
  pageSize: number = parseInt(process.env.pageSize),
) => {
  connectMongo()
  // const genes = await Gene.find({label: new RegExp(searchTerm, "i")}, "label alias")
  //   .skip(pageIndex * pageSize)
  //   .limit(pageSize)
  const genes = await Gene.aggregate()
    .match({label: new RegExp(searchTerm, "i")})
    .skip(pageIndex * pageSize)
    .limit(10)
    .lookup({
      from: "species",
      localField: "spe_id",
      foreignField: "_id",
      pipeline: [{
        $project: {_id: 0, tax: 1, name: 1}
      }],
      as: "species",
    })
    .unwind("species")
    .project({label: 1, alias: 1, species: 1})
  const numGenes = await Gene.countDocuments({label: new RegExp(searchTerm, "i")})
  const pageTotal = Math.ceil(numGenes / pageSize)
  return {
    pageIndex: pageIndex,
    pageTotal: pageTotal,
    numGenes: numGenes,
    genes: genes,
  }
}
