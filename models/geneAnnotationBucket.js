import { Schema, model, models, ObjectId } from "mongoose";

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
      $type: Array[ObjectId],
      required: true,
    },
  },
  { strict: "throw" }
);
/* The schema will use the keyword $type to set the type of the field. And you can safely use type to set the name of the field. */

const GeneAnnotationBucket =
  models.GeneAnnotationBucket ||
  model("GeneAnnotationBucket", geneAnnotationBucketSchema, "gene_annotation_buckets");

export default GeneAnnotationBucket;
