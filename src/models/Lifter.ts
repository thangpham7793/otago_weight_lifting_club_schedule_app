import { Schema } from "mongoose"
import mongoose from "mongoose"

//TODO: still unclear about the relationship between exercises and personal bests
// Is there a 1-1 correspondence here?
const PBsSchema = new Schema(
  {
    pb1: Number,
    pb2: Number,
    pb3: Number,
    pb4: Number,
    pb5: Number,
  },
  { timestamps: true }
)

const LifterSchema = new Schema(
  {
    name: { type: String, required: true },
    group: { type: String, required: true },
    personalBests: PBsSchema,
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WeeklySchedule", //TODO: should I use auto-populate here? https://mongoosejs.com/docs/populate.html#field-selection, https://mongoosejs.com/docs/guide.html#virtuals 'convertedSchedule', called after populate()? Which one to show?
    },
  },
  { timestamps: true }
)

const Lifter = mongoose.model("Lifter", LifterSchema)

export default Lifter
