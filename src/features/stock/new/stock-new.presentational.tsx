"use client";

import StockForm from "@/features/stock/stock-form.shared";

export function StockNew() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">新規銘柄登録</h1>
      </div>
      <StockForm mode="create" />
    </div>
  );
}
