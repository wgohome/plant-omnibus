import { ObjectId } from "mongoose"

import Species from "../models/species"
import Gene from "../models/gene"
import connectMongo from "../utils/connectMongo"

interface GenesPageInputArgs {
  taxid: number
  pageIndex: number
  pageSize: number
  queryFilter?: string | null
  sortByObject?: object
}

/*
  Used for species show page, where the table of all genes for the species is at
 */
export const getGenesPage = async ({
  taxid,
  pageIndex = 0,
  pageSize = parseInt(process.env.pageSize!),
  queryFilter = null,
  sortByObject,
}: GenesPageInputArgs) => {
  connectMongo()
  const species = await Species.findOne({"tax": taxid}, "_id")
  const species_id = species._id
  const queryObject = {"spe_id": species_id}
  if (queryFilter) {
    queryObject["$or"] = [
      { label: { "$regex": new RegExp(queryFilter), "$options": "i" } },
      // TODO check through list of alias in db
      // { alias: { "$regex": new RegExp(queryFilter), "$options": "i" } },
    ]
  }
  const genes = await Gene.find(queryObject)
    .sort(sortByObject)
    .skip(pageIndex * pageSize)
    .limit(pageSize)
    .populate("gene_annotations")
    .lean()
  const numGenes = await Gene.countDocuments(queryObject)
  /*
    NOTE: pageTotal is the number of pages required for the given pageSize,
    which is then needed by react-table's useTable() hook
  */
  const pageTotal = Math.ceil(numGenes / pageSize)
  return {
    // pageIndex: pageIndex,
    pageTotal: pageTotal,
    numGenes: numGenes,
    genes: genes,
  }
}

/*
  To return a single gene doc with its associated docs
  For gene show page
 */
export const getOneGene = async (
  species_id: ObjectId,
  label: string,
) => {
  connectMongo()
  const gene = await Gene.findOne({"spe_id": species_id, "label": label})
    .populate("gene_annotations")
    .populate({
      path: "neighbors.gene",
      select: "label ga_ids",
      populate: "gene_annotations",
    })
  return gene
}

/*
  Returns a page of full gene docs
  Used for search results
 */
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
    .limit(pageSize)
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


/*
  Returns just gene labels
  Used for search recommendations
 */
export const getGeneLabelsSearchPage = async (
  searchTerm: string,
  pageIndex: number = 0,
  pageSize: number = parseInt(process.env.pageSize),
) => {
  connectMongo()
  const genes = await Gene.find({label: new RegExp(searchTerm, "i")}, "label")
    .skip(pageIndex * pageSize)
    .limit(pageSize)
  return { genes }
}


/*
  For protein seq search results
  From an array of taxid and gene label,
  return gene annotation names (filter for MAPMAN within the API call itself)
*/
export const getManyGenes = async (
  hits: {species_id: ObjectId, gene_label: string}[]
) => {
  connectMongo()
  const results = Promise.all(
    hits.map(async (hit) => {
      return await Gene.findOne({ spe_id: hit.species_id, label: hit.gene_label })
        .populate("gene_annotations")
        .lean()
    })
  )
  return results
}
