module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  testMatch: ["**/backend/tests/*.+(ts|tsx|js)"],
}
