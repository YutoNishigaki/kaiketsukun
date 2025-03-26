-- CreateTable
CREATE TABLE "DividendRecord" (
    "id" TEXT NOT NULL,
    "stockCode" TEXT NOT NULL,
    "stockName" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "sharesHeld" INTEGER NOT NULL,
    "dividendPerShare" DOUBLE PRECISION NOT NULL,
    "dividendPayoutRatio" DOUBLE PRECISION NOT NULL,
    "memo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DividendRecord_pkey" PRIMARY KEY ("id")
);
