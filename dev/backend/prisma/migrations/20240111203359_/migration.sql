/*
  Warnings:

  - You are about to drop the column `heroId` on the `History` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_heroId_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "heroId";

-- CreateTable
CREATE TABLE "_HeroToHistory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HeroToHistory_AB_unique" ON "_HeroToHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroToHistory_B_index" ON "_HeroToHistory"("B");

-- AddForeignKey
ALTER TABLE "_HeroToHistory" ADD CONSTRAINT "_HeroToHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroToHistory" ADD CONSTRAINT "_HeroToHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;
