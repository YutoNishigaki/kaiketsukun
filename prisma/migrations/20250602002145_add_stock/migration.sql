/*
  Warnings:

  - You are about to alter the column `user_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "user_name" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "stock" (
    "stock_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "stock_code" VARCHAR(20) NOT NULL,
    "stock_name" VARCHAR(100) NOT NULL,
    "sector" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("stock_id")
);

-- CreateTable
CREATE TABLE "holding" (
    "houlding_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "stock_code" VARCHAR(20) NOT NULL,
    "current_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "avg_price" DOUBLE PRECISION NOT NULL,
    "expected_div" DOUBLE PRECISION NOT NULL,
    "dividend_months" TEXT NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "holding_pkey" PRIMARY KEY ("houlding_id")
);

-- CreateTable
CREATE TABLE "dividend_history" (
    "dividend_history_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "stock_code" VARCHAR(20) NOT NULL,
    "received_at" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dividend_history_pkey" PRIMARY KEY ("dividend_history_id")
);

-- CreateTable
CREATE TABLE "trade_history" (
    "trade_history_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "stock_code" VARCHAR(20) NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL,
    "traded_at" TIMESTAMP(3) NOT NULL,
    "realized_gain" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trade_history_pkey" PRIMARY KEY ("trade_history_id")
);

-- CreateIndex
CREATE INDEX "stock_user_id_idx" ON "stock"("user_id");

-- CreateIndex
CREATE INDEX "stock_user_id_stock_code_idx" ON "stock"("user_id", "stock_code");

-- CreateIndex
CREATE UNIQUE INDEX "stock_user_id_stock_code_key" ON "stock"("user_id", "stock_code");

-- CreateIndex
CREATE INDEX "holding_user_id_idx" ON "holding"("user_id");

-- CreateIndex
CREATE INDEX "holding_user_id_stock_code_idx" ON "holding"("user_id", "stock_code");

-- CreateIndex
CREATE INDEX "dividend_history_user_id_idx" ON "dividend_history"("user_id");

-- CreateIndex
CREATE INDEX "dividend_history_user_id_stock_code_idx" ON "dividend_history"("user_id", "stock_code");

-- CreateIndex
CREATE INDEX "trade_history_user_id_idx" ON "trade_history"("user_id");

-- CreateIndex
CREATE INDEX "trade_history_user_id_stock_code_idx" ON "trade_history"("user_id", "stock_code");

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holding" ADD CONSTRAINT "holding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holding" ADD CONSTRAINT "holding_user_id_stock_code_fkey" FOREIGN KEY ("user_id", "stock_code") REFERENCES "stock"("user_id", "stock_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dividend_history" ADD CONSTRAINT "dividend_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dividend_history" ADD CONSTRAINT "dividend_history_user_id_stock_code_fkey" FOREIGN KEY ("user_id", "stock_code") REFERENCES "stock"("user_id", "stock_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_history" ADD CONSTRAINT "trade_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_history" ADD CONSTRAINT "trade_history_user_id_stock_code_fkey" FOREIGN KEY ("user_id", "stock_code") REFERENCES "stock"("user_id", "stock_code") ON DELETE RESTRICT ON UPDATE CASCADE;
