import { compare, hash } from "../../utils/cryptoService"
import test from "node:test"
import assert from "node:assert/strict"

test("hashed pw can be used to verify user input", async () => {
  const pw = "foo"

  const saved = await hash(pw)
  const actual = await compare(pw, saved)
  assert.equal(true, actual)
})
