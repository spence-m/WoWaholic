-- CreateTable
CREATE TABLE "helpful" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "page" STRING NOT NULL,
    "votes" INT4 NOT NULL,

    CONSTRAINT "helpful_pkey" PRIMARY KEY ("id")
);
