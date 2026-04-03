/*
  Warnings:

  - You are about to drop the `ValidationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ValidationToken" DROP CONSTRAINT "ValidationToken_user_id_fkey";

-- DropTable
DROP TABLE "public"."ValidationToken";

-- CreateTable
CREATE TABLE "ValidationEmailToken" (
    "token_hash" TEXT NOT NULL,
    "user_id" TEXT,
    "email" TEXT NOT NULL,
    "is_most_recent" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ValidationEmailToken_pkey" PRIMARY KEY ("token_hash")
);

-- AddForeignKey
ALTER TABLE "ValidationEmailToken" ADD CONSTRAINT "ValidationEmailToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
