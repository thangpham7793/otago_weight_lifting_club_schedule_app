import { Schema } from "mongoose"
import mongoose from "mongoose"

//TODO: still unclear about the relationship between exercises and personal bests
// Is there a 1-1 correspondence here?
const PBsSchema = new Schema({
  pb1: Number,
  pb2: Number,
  pb3: Number,
  pb4: Number,
  pb5: Number,
})

const LifterSchema = new Schema({
  name: { type: String, required: true },
  group: { type: String, required: true },
  personalBests: PBsSchema,
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule", //TODO: should I use auto-populate here?
  },
})

const Lifter = mongoose.model("Lifter", LifterSchema)

export default Lifter
