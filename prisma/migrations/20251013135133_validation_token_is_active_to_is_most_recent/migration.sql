/*
  Warnings:

  - You are about to drop the column `is_active` on the `ValidationToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ValidationToken" DROP COLUMN "is_active",
ADD COLUMN     "is_most_recent" BOOLEAN NOT NULL DEFAULT true;
