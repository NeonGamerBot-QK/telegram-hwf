-- CreateTable
CREATE TABLE "_FeelingToUser" (
  "A" INTEGER NOT NULL,
  "B" INTEGER NOT NULL,
  CONSTRAINT "_FeelingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Feeling" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "_FeelingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeelingToUser_AB_unique" ON "_FeelingToUser" ("A", "B");

-- CreateIndex
CREATE INDEX "_FeelingToUser_B_index" ON "_FeelingToUser" ("B");
