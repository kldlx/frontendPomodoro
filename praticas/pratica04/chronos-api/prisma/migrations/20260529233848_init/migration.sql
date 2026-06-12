/*
  Warnings:

  - The primary key for the `settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `completeDate` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `interruptDate` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startDate` on the `task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `settings` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `task` DROP COLUMN `startDate`,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    DROP COLUMN `completeDate`,
    ADD COLUMN `completeDate` DATETIME(3) NULL,
    DROP COLUMN `interruptDate`,
    ADD COLUMN `interruptDate` DATETIME(3) NULL;
