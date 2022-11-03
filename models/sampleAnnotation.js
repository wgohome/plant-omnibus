import { Schema, model, models, ObjectId } from "mongoose"

import Species from "./species"
import Gene from "./gene"

const sampleSchema = new Schema({
  label: String,
  tpm: Number,
});

const sampleAnnotationSchema = new Schema(
  {
    spe_id: {
      type: ObjectId,
      required: true,
    },
    g_id: {
      type: ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    avg_tpm: {
      type: Number,
      required: true,
    },
    spm: {
      type: Number,
      required: true,
    },
    med_tpm: {
      type: Number,
      // required: true,
    },
    spm_med: {
      type: Number,
      // required: true,
    },
    samples: [sampleSchema],
  },
  { strict: "throw" }
);

sampleAnnotationSchema.virtual("species", {
  ref: "Species",
  localField: "spe_id",
  foreignField: "_id",
  justOne: true,
})

sampleAnnotationSchema.virtual("gene", {
  ref: "Gene",
  localField: "g_id",
  foreignField: "_id",
  justOne: true,
})

sampleAnnotationSchema.set("toObject", { virtuals: true });
sampleAnnotationSchema.set("toJSON", { virtuals: true });

const SampleAnnotation = models.SampleAnnotation || model("SampleAnnotation", sampleAnnotationSchema, "sample_annotations")

export default SampleAnnotation
