/*
  Warnings:

  - You are about to drop the column `is_most_recent` on the `ValidationEmailToken` table. All the data in the column will be lost.
  - Made the column `user_id` on table `ValidationEmailToken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ValidationEmailToken" DROP COLUMN "is_most_recent",
ALTER COLUMN "user_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "token_hash" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "already_used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("token_hash")
);

-- AddForeignKey
ALTER TABLE "ResetPasswordToken" ADD CONSTRAINT "ResetPasswordToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
