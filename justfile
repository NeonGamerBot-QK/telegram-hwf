track:
    wakapi-anyide track

encrypt-env:
    dotenvx encrypt

decrypt-env:
    dotenvx decrypt
start: 
    bun run src/index.ts

dbgen:
    just decrypt-env
    bunx prisma generate
    just encrypt-env

dbpush:
    just decrypt-env
    bunx prisma db push
    just encrypt-env
dbmigrate:
    just decrypt-env
    bunx prisma migrate dev
    just encrypt-env
generate-keys: 
    bun run scripts/create-keys.ts