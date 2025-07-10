-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DELIVERY_METHOD" AS ENUM ('HOME_DELIVERY', 'STORE_PICKUP');

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL DEFAULT 0,
    "delivery_fee" INTEGER NOT NULL DEFAULT 0,
    "insurance_fee" INTEGER NOT NULL DEFAULT 0,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "method" "DELIVERY_METHOD" NOT NULL DEFAULT 'HOME_DELIVERY',
    "receiver_name" TEXT,
    "phone_number" TEXT,
    "address" TEXT,
    "province" TEXT,
    "city" TEXT,
    "district" TEXT,
    "postal_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_items" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "price_per_item" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "transaction_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_items" ADD CONSTRAINT "transaction_items_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_items" ADD CONSTRAINT "transaction_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
