import { Schema, model, models, ObjectId } from "mongoose";

import GeneAnnotationBucket from "./geneAnnotationBucket"

const geneAnnotationSchema = new Schema(
  {
    _id: {
      $type: ObjectId,
      required: true,
    },
    type: {
      $type: String,
      required: true,
    },
    label: {
      $type: String,
      required: true,
    },
    name: {
      $type: String,
      required: true,
    },
    details: {
      $type: Object,
    },
    // TODO: add other fields
  }, { typeKey: "$type", strict: "throw" }
)
/* The schema will use the keyword $type to set the type of the field. And you can safely use type to set the name of the field. */

geneAnnotationSchema.virtual("gene_annotation_buckets", {
  ref: "GeneAnnotationBucket",
  localField: "_id",
  foreignField: "ga_id",
})
/* These are needed for virtual fields to appear */
geneAnnotationSchema.set("toObject", { virtuals: true })
geneAnnotationSchema.set("toJSON", { virtuals: true })

const GeneAnnotation =
  models.GeneAnnotation ||
  model("GeneAnnotation", geneAnnotationSchema, "gene_annotations");

export default GeneAnnotation
