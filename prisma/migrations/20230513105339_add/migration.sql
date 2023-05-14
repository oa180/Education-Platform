/*
  Warnings:

  - Added the required column `answer` to the `Answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "answer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "question" TEXT NOT NULL;
