/*
  Warnings:

  - You are about to drop the column `type` on the `ValidationToken` table. All the data in the column will be lost.
  - Added the required column `email` to the `ValidationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ValidationToken" DROP COLUMN "type",
ADD COLUMN     "email" TEXT NOT NULL;
