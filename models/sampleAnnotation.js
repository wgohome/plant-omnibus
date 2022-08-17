import { Schema, model, models, ObjectId } from "mongoose"

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
    samples: [sampleSchema],
  },
  { strict: "throw" }
);

const SampleAnnotation = models.SampleAnnotation || model("SampleAnnotation", sampleAnnotationSchema, "sample_annotations")

export default SampleAnnotation
