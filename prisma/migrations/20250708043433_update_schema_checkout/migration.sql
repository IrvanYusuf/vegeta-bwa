/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id]` on the table `checkouts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "checkouts_user_id_product_id_key" ON "checkouts"("user_id", "product_id");
