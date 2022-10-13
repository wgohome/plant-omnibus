import { Schema, model, models, ObjectId } from "mongoose";


const geneAnnotationSchema = new Schema(
  {
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

const GeneAnnotation =
  models.GeneAnnotation ||
  model("GeneAnnotation", geneAnnotationSchema, "gene_annotations");

export default GeneAnnotation
