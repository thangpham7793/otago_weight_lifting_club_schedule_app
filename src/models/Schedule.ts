import { Schema } from "mongoose"
import mongoose from "mongoose"

//sub-documents
const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  rep: { type: String, required: true },
  set: { type: String, required: true },
  weightPercent: { type: Number, required: true },
})

const DaySchema = new Schema({
  number: { type: String, required: true },
  exercises: { type: [ExerciseSchema], required: true },
})

const WeekSchema = new Schema({
  number: { type: String, required: true },
  days: { type: [DaySchema], required: true },
})

const ScheduleSchema = new Schema({
  group: { type: String, required: true },
  weeks: [WeekSchema],
  updated: { type: Date, default: Date.now },
})

const Schedule = mongoose.model("Schedule", ScheduleSchema)

export default Schedule
