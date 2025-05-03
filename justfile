track:
    wakapi-anyide track

encrypt-env:
    dotenvx encrypt

decrypt-env:
    dotenvx decrypt
start: 
    bun run src/index.ts

dbgen:
    bunx prisma generate

dbpush:
    just decrypt-env
    bunx prisma db push
    just encrypt-env

generate-keys: 
    bun run scripts/create-keys.ts