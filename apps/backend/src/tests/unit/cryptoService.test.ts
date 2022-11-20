import { compare, hash } from "../../utils/cryptoService.ts";

import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

Deno.test("hashed pw can be used to verify user input", async () => {
  const pw = "foo";

  const saved = await hash(pw);
  const actual = await compare(pw, saved);
  assertEquals(true, actual);
});
