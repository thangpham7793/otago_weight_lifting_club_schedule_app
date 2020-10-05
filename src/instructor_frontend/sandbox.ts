import { exercises } from "./exercises"

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

interface TimeTable {
  "week 1"?: WeeklyExercises
  "week 2"?: WeeklyExercises
  "week 3"?: WeeklyExercises
  "week 4"?: WeeklyExercises
  "week 5"?: WeeklyExercises
  "week 6"?: WeeklyExercises
  "week 7"?: WeeklyExercises
  "week 8"?: WeeklyExercises
}

function makeTimeTable(exercisesArr: Exercise[]): TimeTable {
  const aggregate = {}

  function getWeekDayPair(exercisesArr: Exercise[]) {
    let prevPair: [number, number] = [0, 0]
    return exercisesArr.reduce((pairs, { week, day }) => {
      if (prevPair[0] !== week || prevPair[1] !== day) {
        prevPair = [week, day]
        pairs.push([week, day])
      }
      return pairs
    }, [])
  }

  function extractDailyExercises(w: number, d: number) {
    exercisesArr
      .filter(({ week, day }) => week === w && day === d)
      .reduce((acc: any, { exercise, instruction }) => {
        //initialise prop week if not exist
        if (acc[`week ${w}`] === undefined) {
          acc[`week ${w}`] = {}
        }

        //initialise prop day of week if not exist
        if (acc[`week ${w}`][`day ${d}`] === undefined) {
          acc[`week ${w}`][`day ${d}`] = []
        }

        //push obj to proper week and day
        acc[`week ${w}`][`day ${d}`].push({ exercise, instruction })

        return acc
      }, aggregate)
  }

  getWeekDayPair(exercisesArr).forEach((dayInWeek) =>
    extractDailyExercises(dayInWeek[0], dayInWeek[1])
  )
  return aggregate
}

function makeWeeklySchedulesString(weeklySchedules: TimeTable) {
  return Object.values(weeklySchedules).reduce((acc, week, index: number) => {
    if (index === 0) {
      return `'${JSON.stringify(week)}'`
    } else {
      return `${acc}, '${JSON.stringify(week)}'`
    }
  }, "")
}

const util = require(`util`)

// console.log(util.inspect(pairs, { showHidden: false, depth: null }))
console.log(
  util.inspect(makeWeeklySchedulesString(makeTimeTable(exercises)), {
    showHidden: false,
    depth: null,
  })
)
