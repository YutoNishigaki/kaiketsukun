"use client";

import StockForm from "@/features/stock/stock-form.shared";
import { Stock } from "@prisma/client";

type StockEditProps = {
  stock: Stock;
};

export function StockEdit({ stock }: StockEditProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">銘柄編集</h1>
      </div>
      <StockForm mode="edit" stock={stock} />
    </div>
  );
}
