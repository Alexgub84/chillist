PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('ff42a0c5-7160-44a6-a2ec-8f9ca2742eeb','6c1c354b22cb6ec7be3cdbdeec424504ccf96fa40847818868daf5e2bc7e0375',1724880448548,'20240828150323_init',NULL,NULL,1724880448543,1);
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "tripEventId" TEXT,
    CONSTRAINT "User_tripEventId_fkey" FOREIGN KEY ("tripEventId") REFERENCES "TripEvent" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO User VALUES('cfa475fb-728b-4350-8995-c5aaaf82bb3a','Alex','alex.gub@gmail.com',1724880457784,1724880457790,'51b54476-d9c1-435b-802e-19d9493bb679');
INSERT INTO User VALUES('8b36a780-218b-4a74-abc4-ae7ae908e51f','Kfir','kfirfuks@gmail.com',1724880457787,1724880457790,'51b54476-d9c1-435b-802e-19d9493bb679');
CREATE TABLE IF NOT EXISTS "TripEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "owner" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO TripEvent VALUES('51b54476-d9c1-435b-802e-19d9493bb679','Our first trip','Alex',1724880457789,1724880457789,1724880457789);
CREATE TABLE IF NOT EXISTS "ListRow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "price" REAL,
    "notes" TEXT NOT NULL,
    "amountType" TEXT NOT NULL,
    "amount" REAL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tripEventId" TEXT NOT NULL,
    CONSTRAINT "ListRow_tripEventId_fkey" FOREIGN KEY ("tripEventId") REFERENCES "TripEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO ListRow VALUES('936df90a-7f72-4330-a40c-59f69d98317f','List Item 1','Alex',10.500000000000000444,'Some notes','units',2.0,'PENDING',1724880457791,1724880457791,'51b54476-d9c1-435b-802e-19d9493bb679');
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "ListRow_ownerName_idx" ON "ListRow"("ownerName");
CREATE INDEX "ListRow_tripEventId_idx" ON "ListRow"("tripEventId");
COMMIT;
