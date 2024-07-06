/*
  Warnings:

  - You are about to drop the column `Content` on the `Journal` table. All the data in the column will be lost.
  - Added the required column `content` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Journal` DROP COLUMN `Content`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL;
