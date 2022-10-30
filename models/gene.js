import { Schema, model, models, ObjectId } from "mongoose";

import GeneAnnotation from "./geneAnnotation";

const neighborSchema = new Schema({
  label: String,
  pcc: Number,
})

const geneSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  alias: {
    type: [String],
    required: true,
    default: [],
  },
  spe_id: {
    type: ObjectId,
    required: true,
  },
  ga_ids: {
    type: [ObjectId],
    required: true,
    default: [],
    ref: "GeneAnnotation", // run .populate("ga_ids") to get objects
  },
  neighbors: {
    type: [neighborSchema],
  }
})

geneSchema.virtual("gene_annotations", {
  ref: "GeneAnnotation",
  localField: "ga_ids",
  foreignField: "_id",
})

geneSchema.virtual("neighborGenes", {
  ref: "Gene",
  localField: "neighbors.label",
  foreignField: "label",
})

/* These are needed for virtual fields to appear */
geneSchema.set("toObject", { virtuals: true })
geneSchema.set("toJSON", { virtuals: true })

const Gene = models.Gene || model("Gene", geneSchema, "genes")

export default Gene
