const fs = require("fs")

const MAX_NUM_OF_BACKUP_FILES = 5

/**
 * @param {string} filename
 * @returns {number} timestamp
 */
const extract_timestamp = (filename) => {
  const res = filename.match(new RegExp(/(?<timestamp>^\d+)_daily_backup.sql/))

  return res?.groups?.timestamp ? parseInt(timestamp) : -1
}

const byDescendingDate = (a, b) =>
  extract_timestamp(a) > extract_timestamp(b) ? -1 : 1

const main = () => {
  const backup_files = fs
    .readdirSync(".")
    .filter((name) => name.endsWith("_daily_backup.sql"))
    .sort(byDescendingDate)

  if (backup_files.length <= MAX_NUM_OF_BACKUP_FILES) {
    console.log("less than 5 backup files, skip trimming")
  } else {
    const oldest = backup_files.pop()
    if (oldest) {
      fs.unlinkSync(oldest)
      console.log(`remove oldest backup file ${oldest}`)
    }
  }

  console.log(
    `latest backup files in descending order are\n${backup_files.join("\n")}`
  )
}

main()
