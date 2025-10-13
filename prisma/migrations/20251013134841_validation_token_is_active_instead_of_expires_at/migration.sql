/*
  Warnings:

  - You are about to drop the column `expires_at` on the `ValidationToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ValidationToken" DROP COLUMN "expires_at",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
