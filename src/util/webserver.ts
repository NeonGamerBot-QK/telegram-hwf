// using bun :3
import type { ModifiedTelegramBot } from "..";
export function startWebServer(bot: ModifiedTelegramBot, port: number) {
return Bun.serve({
    async fetch(req: Request) {
    return new Response("200 ok")
    },
    port: port
})
}
