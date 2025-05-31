/*
  Warnings:

  - You are about to drop the `_FeelingToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `friendsList` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mainChatId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telegramId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Feeling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_FeelingToUser_B_index";

-- DropIndex
DROP INDEX "_FeelingToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FeelingToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feeling" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "types" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Feeling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Feeling" ("created_at", "description", "id", "tags", "types") SELECT "created_at", "description", "id", "tags", "types" FROM "Feeling";
DROP TABLE "Feeling";
ALTER TABLE "new_Feeling" RENAME TO "Feeling";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
