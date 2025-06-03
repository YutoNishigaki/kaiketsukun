"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StockForm from "@/features/stock/stock-form.shared";
import { getStockById, type Stock } from "@/store/stock";

export default function EditStockPage() {
  const params = useParams();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const stockData = getStockById(id);
    setStock(stockData);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!stock) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">銘柄が見つかりません</h1>
          <p className="text-gray-600 mt-2">
            指定された銘柄は存在しないか、削除されています。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">銘柄編集</h1>
        <p className="text-gray-600 mt-1">
          {stock.name} ({stock.code}) の情報を編集します
        </p>
      </div>
      <StockForm stock={stock} mode="edit" />
    </div>
  );
}
