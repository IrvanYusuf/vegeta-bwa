/*
  Warnings:

  - Added the required column `payment_due` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "payment_due" TIMESTAMP(3) NOT NULL;
