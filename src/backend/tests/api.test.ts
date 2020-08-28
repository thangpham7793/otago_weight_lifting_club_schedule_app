import app from "../app"
import request from "supertest"

describe("GET / a simple home route", () => {
  it("should return a Hello World message", async () => {
    const result = await request(app).get("/")
    expect(result.text).toEqual("Hello World!")
    expect(result.status).toEqual(200)
  })
})

//need to match my routes to my queries before writing tests
