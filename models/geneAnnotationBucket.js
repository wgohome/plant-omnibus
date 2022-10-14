import { Schema, model, models, ObjectId } from "mongoose"

import Species from "./species"
import Gene from "./gene";

const geneAnnotationBucketSchema = new Schema(
  {
    ga_id: {
      $type: ObjectId,
      required: true,
    },
    tax: {
      $type: Number,
      required: true,
    },
    gene_ids: {
      $type: [ObjectId],
      required: true,
    },
  },
  {
    typeKey: "$type",
    strict: "throw",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
/* The schema will use the keyword $type to set the type of the field. And you can safely use type to set the name of the field. */

geneAnnotationBucketSchema.virtual("species", {
  ref: "Species",
  localField: "tax",
  foreignField: "tax",
  justOne: true,
})
geneAnnotationBucketSchema.virtual("genes", {
  ref: "Gene",
  localField: "gene_ids",
  foreignField: "_id",
})


const GeneAnnotationBucket =
  models.GeneAnnotationBucket ||
  model("GeneAnnotationBucket", geneAnnotationBucketSchema, "gene_annotation_buckets");

export default GeneAnnotationBucket;
