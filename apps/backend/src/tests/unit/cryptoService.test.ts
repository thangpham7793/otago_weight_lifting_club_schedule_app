import { compare, hash } from "../../utils/cryptoService"

test("hashed pw can be used to verify user input", async () => {
  const pw = "foo"

  const saved = await hash(pw)
  await expect(compare(pw, saved)).resolves.toBe(true)
})
