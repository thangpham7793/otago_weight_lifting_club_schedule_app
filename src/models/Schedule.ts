import { Schema } from "mongoose"
import mongoose from "mongoose"

const weightEstimateMethods: string[] = ["percentage", "rir", "rep"]
const requiredString = { type: String, required: true }
const requiredNumber = { type: Number, required: true }

// type could take percentage, rpe, or rir type
const ExerciseSchema = new Schema(
  {
    name: requiredString,
    type: { ...requiredString, enum: weightEstimateMethods },
    value: requiredNumber,
    rep: { type: Number, default: 0 }, //there's no rep if it's of type RIR
    set: requiredNumber, //there's always set
  },
  { timestamps: true }
)

//can just the pre('save') to actually calculate the actual weight?
//https://mongoosejs.com/docs/middleware.html#error-handling or aggregate?

//TODO: how to enforce constraints on different types of estimate (percentage: 0-100), (RIR: ...) (REP: 1-10)

//Just one general feedback form for each day

//RIR, RPE, % can't be mixed for exercise! Need to go over it with him tmr
const DaySchema = new Schema(
  {
    number: requiredString,
    exercises: { type: [ExerciseSchema], required: true },
  },
  { timestamps: true }
)

const WeeklyScheduleSchema = new Schema(
  {
    group: requiredString,
    number: requiredString,
    //1, 1.5, 2, 2.5, 3 = optional may take this into account
    //kids should see all 5 days and then choose
    days: { type: [DaySchema], required: true },
  },
  { timestamps: true }
)

const WeeklySchedule = mongoose.model("Schedule", WeeklyScheduleSchema)

export default WeeklySchedule
