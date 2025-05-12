-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramId" TEXT NOT NULL,
    "mainChatId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Feeling" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "types" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
