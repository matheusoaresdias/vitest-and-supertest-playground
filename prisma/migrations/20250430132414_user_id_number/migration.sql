/*
  Warnings:

  - You are about to alter the column `userId` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_Task" ("description", "id", "title", "userId") SELECT "description", "id", "title", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_title_key" ON "Task"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
