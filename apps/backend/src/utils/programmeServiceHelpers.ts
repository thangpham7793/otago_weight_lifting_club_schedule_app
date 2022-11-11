import { ScheduleInfo, ScheduleInfoRow } from "../types"

export function scheduleInfoJsonFormatter(
  rows: ScheduleInfoRow[]
): ScheduleInfo[] | null {
  if (rows.length === 0) return null

  function extractProgrammeInfo(
    targetRow: ScheduleInfoRow,
    rows: ScheduleInfoRow[]
  ) {
    return rows
      .filter((r) => r.scheduleId === targetRow.scheduleId)
      .reduce(
        (
          acc: ScheduleInfo,
          { scheduleId, scheduleName, weekCount, programmeId, programmeName },
          index
        ) => {
          console.log(scheduleId)
          if (index === 0) {
            if (programmeId && programmeName) {
              return {
                scheduleId,
                scheduleName,
                weekCount,
                programmes: [{ programmeId, programmeName }],
              }
            } else {
              return {
                scheduleId,
                scheduleName,
                weekCount,
                programmes: [],
              }
            }
          } else {
            if (programmeId && programmeName) {
              acc.programmes.push({ programmeId, programmeName })
            }
            return acc
          }
        },
        { scheduleId: 0, scheduleName: "", weekCount: 0, programmes: [] }
      )
  }

  let processed: number[] = []
  let res: ScheduleInfo[] = []

  rows.forEach((r) => {
    if (!processed.includes(r.scheduleId)) {
      console.log(r.scheduleId)
      processed.push(r.scheduleId)
      res.push(extractProgrammeInfo(r, rows))
    }
  })

  console.log(processed)

  return res
}
