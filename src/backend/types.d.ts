interface Exercise {
  week: number
  day: number
  exercise: string
  instruction: string
}

interface DailyExercise {
  exercise: string
  instruction: string
}

interface WeeklyExercises {
  "day 1"?: DailyExercise[]
  "day 2.5"?: DailyExercise[]
  "day 2"?: DailyExercise[]
  "day 3.5"?: DailyExercise[]
  "day 3"?: DailyExercise[]
}

export interface TimeTable {
  "week 1"?: WeeklyExercises
  "week 2"?: WeeklyExercises
  "week 3"?: WeeklyExercises
  "week 4"?: WeeklyExercises
  "week 5"?: WeeklyExercises
  "week 6"?: WeeklyExercises
  "week 7"?: WeeklyExercises
  "week 8"?: WeeklyExercises
}

export interface ScheduleInfoRow {
  scheduleId: number
  scheduleName: string
  weekCount: number
  programmeId?: number
  programmeName?: string
}

export interface ProgrammeInfo {
  programmeId: number
  programmeName: string
}

export interface ScheduleInfo extends ScheduleInfoRow {
  programmes: Array<ProgrammeInfo>
}
