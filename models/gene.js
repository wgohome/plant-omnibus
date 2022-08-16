import { Schema, model, models, ObjectId } from "mongoose";

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
  },

})

const Gene = models.Gene || model("Gene", geneSchema, "genes")

export default Gene
