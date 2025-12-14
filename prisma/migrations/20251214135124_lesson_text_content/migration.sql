/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `content` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "videoUrl",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "reference" TEXT;
