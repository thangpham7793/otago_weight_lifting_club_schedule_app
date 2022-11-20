import app from "../app.ts";
import { superdeno } from "https://deno.land/x/superdeno@4.8.0/mod.ts";

export const INSTRUCTOR_TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Imluc3RydWN0b3JJZCI6M30sImlhdCI6MTY2ODIwMjgxMywiZXhwIjo4ODA2ODIwMjgxM30.jl0Oq5z-JtHoi0nHfZrh1yyKK8y8Hh-XAoEAk4fT6nE";

export const LEARNER_TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImxlYXJuZXJJZCI6NDV9LCJpYXQiOjE2NjgyMDI4MTMsImV4cCI6ODgwNjgyMDI4MTN9.wqffHt3cyahF1SZZNK-MxMsemfXb4vqNKhuh3CNL-4I";

export const api = superdeno(app);
