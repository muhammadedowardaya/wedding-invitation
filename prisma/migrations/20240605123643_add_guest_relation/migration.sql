/*
  Warnings:

  - You are about to drop the column `guestName` on the `invitation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `invitation` DROP COLUMN `guestName`;

-- CreateTable
CREATE TABLE `Guest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `invitationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Guest` ADD CONSTRAINT `Guest_invitationId_fkey` FOREIGN KEY (`invitationId`) REFERENCES `Invitation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
