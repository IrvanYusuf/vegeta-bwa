-- CreateTable
CREATE TABLE "checkouts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "price_per_item" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkouts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
