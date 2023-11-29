/*
  Warnings:

  - You are about to drop the column `ListRow` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `Patricipant` on the `Event` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "participants" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventOwner" TEXT NOT NULL,
    "lists" TEXT NOT NULL
);
INSERT INTO "new_Event" ("createdAt", "endDate", "eventOwner", "id", "lists", "name", "participants", "startDate") SELECT "createdAt", "endDate", "eventOwner", "id", "lists", "name", "participants", "startDate" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
