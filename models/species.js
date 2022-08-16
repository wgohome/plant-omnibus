import { Schema, model, models } from "mongoose"

const speciesSchema = new Schema({
  tax: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  alias: {
    type: [String],
    required: false,
  },
  cds: {
    source: String,
    url: String,
  },
  qc_stat: {
    logp: Number,
    palgn: Number,
  },
})

const Species = models.Species || model("Species", speciesSchema, "species")

export default Species
