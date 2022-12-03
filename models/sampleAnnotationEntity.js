import { Schema, model, models, ObjectId } from "mongoose"

import Species from "./species"

const sampleAnnotationEntitySchema = new Schema(
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
    spe_ids: {
      $type: [ObjectId],
      required: true,
      default: [],
      ref: "Species",
    },
  },
  { typeKey: "$type", strict: "throw" }
);
/* The schema will use the keyword $type to set the type of the field. And you can safely use type to set the name of the field. */

/* These are needed for virtual fields to appear */
sampleAnnotationEntitySchema.set("toObject", { virtuals: true });
sampleAnnotationEntitySchema.set("toJSON", { virtuals: true });

const SampleAnnotationEntity =
  models.SampleAnnotationEntity ||
  model("SampleAnnotationEntity", sampleAnnotationEntitySchema, "sample_annotation_entities");

export default SampleAnnotationEntity;
