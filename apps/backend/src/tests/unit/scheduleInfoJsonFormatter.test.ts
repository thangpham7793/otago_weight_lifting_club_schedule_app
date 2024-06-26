import { ScheduleInfo, ScheduleInfoRow } from "../../types"
import { scheduleInfoJsonFormatter } from "../../utils/programmeServiceHelpers"
import { describe, it } from "node:test"
import assert from "node:assert/strict"

describe("scheduleInfoJsonFormatter", () => {
  it("return null when there is no schedule", () => {
    const rows: ScheduleInfoRow[] = []
    const json = scheduleInfoJsonFormatter(rows)
    assert.equal(json, null)
  })

  it("return an empty array if a schedule is not published", () => {
    const rows = [
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
      },
    ]

    const expected: ScheduleInfo[] = [
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
        programmes: [],
      },
    ]

    const json = scheduleInfoJsonFormatter(rows)
    assert.deepEqual(json, expected)
  })

  it("reformat programmeIds and Names of a schedule into an array of scheduleInfo objects", () => {
    const rows = [
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
        programmeId: 1,
        programmeName: "Youth and Junior",
      },
    ]

    const expected = [
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
        programmes: [
          {
            programmeId: 1,
            programmeName: "Youth and Junior",
          },
        ],
      },
    ]

    const json = scheduleInfoJsonFormatter(rows)
    assert.deepEqual(json, expected)
  })

  it("return a schedule info object with an array of programme info objects when a schedule belongs to many programmes", () => {
    const rows = [
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
        programmeId: 1,
        programmeName: "Youth and Junior",
      },
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
        programmeId: 2,
        programmeName: "Youth and Junior 2",
      },
    ]

    const expected = [
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
        programmes: [
          {
            programmeId: 1,
            programmeName: "Youth and Junior",
          },
          {
            programmeId: 2,
            programmeName: "Youth and Junior 2",
          },
        ],
      },
    ]

    const json = scheduleInfoJsonFormatter(rows)
    assert.deepEqual(json, expected)
  })

  it("group all programmes of different schedules correctly", () => {
    const rows = [
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
        programmeId: 1,
        programmeName: "Youth and Junior",
      },
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
        programmeId: 2,
        programmeName: "Youth and Junior 2",
      },
      {
        scheduleId: 1,
        scheduleName: "October 2020",
        weekCount: 5,
        programmeId: 1,
        programmeName: "Youth and Junior",
      },
      {
        scheduleId: 1,
        scheduleName: "October 2020",
        weekCount: 5,
        programmeId: 2,
        programmeName: "Youth and Junior 2",
      },
    ]

    const expected = [
      {
        scheduleId: 6,
        scheduleName: "September 2020 Strength",
        weekCount: 5,
        programmes: [
          {
            programmeId: 1,
            programmeName: "Youth and Junior",
          },
          {
            programmeId: 2,
            programmeName: "Youth and Junior 2",
          },
        ],
      },
      {
        scheduleId: 1,
        scheduleName: "October 2020",
        weekCount: 5,
        programmes: [
          {
            programmeId: 1,
            programmeName: "Youth and Junior",
          },
          {
            programmeId: 2,
            programmeName: "Youth and Junior 2",
          },
        ],
      },
    ]

    const json = scheduleInfoJsonFormatter(rows)
    assert.deepEqual(json, expected)
  })
})
