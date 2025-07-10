-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('FUNGI', 'FRUIT', 'VEGETABLE', 'ONION', 'BEANS', 'SPICE');

-- CreateEnum
CREATE TYPE "ProductUnit" AS ENUM ('PCS', 'GRAM', 'KG', 'LITER', 'ML', 'PACK', 'BOX', 'BOTTLE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "item_sold" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "category" "ProductCategory" NOT NULL,
    "unit" "ProductUnit" NOT NULL DEFAULT 'PCS',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_favorites" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_favorites_user_id_product_id_key" ON "product_favorites"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "product_favorites" ADD CONSTRAINT "product_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_favorites" ADD CONSTRAINT "product_favorites_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
