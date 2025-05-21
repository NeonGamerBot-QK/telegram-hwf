// using bun :3
import type { ModifiedTelegramBot } from "..";
export function startWebServer(bot: ModifiedTelegramBot, port: number) {
  return Bun.serve({
    async fetch(req: Request) {
      return new Response(
        await (await Bun.file(__dirname + "/index.html")).text(),
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    },
    port: port,
  });
}