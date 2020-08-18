import { ObjectID } from "mongodb"

interface User {
  userId?: ObjectID
  name: string
  class: string
  personalBests: PersonalBests
}

interface PersonalBests {
  pb1: number
  pb2: number
  pb3: number
  pb4: number
  pb5: number
}

interface Schedule {
  class: string
  weeks: Week[]
  lastUpdatedAt: Date //TODO: datetime type MongoDB?
}

interface Week {
  number: string
  days: Day[]
}

interface Day {
  exercises: Exercise[]
}

interface Exercise {
  rep: string
  set: string
  weightPercentage: number
  feedbackId?: ObjectID
}

interface Feedback {
  feedbackId?: ObjectID
  comments: Comment[]
}

interface Comment {
  commentId?: ObjectID
  authorId: ObjectID
  content: string
}
