import { execute } from "../database/execute.ts";

const statements = [
  `UPDATE public.instructor SET "hashedPassword" = 'e558a79365dc168fa75699046d31abbf9b9031a94a531067b092cfeb052b3b372ff2a11239aee301e2cc348b0f5d3f74' where "hashedPassword" = '$2b$10$CMDX90GP7gt46H9d0pxGm.6M4x2Ivf2TpV2f35san1ykif4RYOfzO'`,
  `UPDATE public.programme SET "hashedPassword" = '03ee63e0c5cefbd07ad2d3d93f89849dc0079a350153c9bc515e83005676cc219de4f3e56dc1466ee6ab9283c4614509' where "hashedPassword" = '$2b$10$KXk7Xky81chsVl0hL8mRKupRZmk3bQqOxqFSYmOgikxe7.LcSqGf.'`,
];

export const updatePasswordHashes = () => {
  return Promise.all(statements.map((s) => execute(s)));
};
