import StockForm from "@/components/stock-form";

export const dynamic = "force-dynamic";

export default function NewStockPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">新規銘柄登録</h1>
        <p className="text-gray-600 mt-1">新しい株式銘柄を登録します</p>
      </div>
      <StockForm mode="create" />
    </div>
  );
}
