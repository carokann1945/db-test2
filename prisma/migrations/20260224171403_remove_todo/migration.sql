/*
  Warnings:

  - Added the required column `updatedAt` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "Todo_userId_idx" ON "Todo"("userId");

-- CreateIndex
CREATE INDEX "Todo_userId_isDone_idx" ON "Todo"("userId", "isDone");
