//@ts-ignore u can in bun :3
import envImport from "../.env";
import { z } from "zod";

const envZ = z.object({
  TELEGRAM_TOKEN: z.string(),
  ENCRYPTION_KEY: z.string(),
  ENC_IV: z.string(),
  ENC_KEY: z.string(),
  PORT: z.string(), //dotenvx makes it a string
});
const envO = envZ.safeParse(envImport);
(async () => {
  if (envO.error) {
    envO.error.issues.map((i) => {
      
      console.log(
      //@ts-ignore
        `${i.path[0]} should be ${i.expected}, but got ${i.received}`,
      );
    });
  }
})();
const env = envO.data!;
export default env;
