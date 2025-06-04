"use client";

import Link from "next/link";
import { Stock } from "@prisma/client";

import { Badge, Button, ConfirmDialog } from "@/components/ui";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteStock } from "@/features/stock/repositories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  stock: Stock;
};

export function StockDetail({ stock }: Props) {
  const handleDelete = async (id: string) => {
    try {
      const { stockName } = await deleteStock(id);

      toast.success(`銘柄：${stockName} を削除しました。`);
    } catch {
      toast.error("削除に失敗しました。");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/stock">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              一覧に戻る
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{stock.stockName}</h1>
            <p className="text-gray-600">銘柄コード: {stock.stockCode}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/stock/${stock.stockId}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          </Link>
          <ConfirmDialog
            triggerComponent={
              <Button variant="outline">
                <Trash2 className="h-4 w-4" />
                削除
              </Button>
            }
            title="銘柄を削除しますか？"
            description={`${stock.stockName} (${stock.stockCode})を削除します。この操作は取り消せません。`}
            positiveLabel="削除"
            positiveButtonVariant={"destructive"}
            positiveButtonAction={() => handleDelete(stock.stockId)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* <Card>
          <CardHeader>
            <CardTitle>価格情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">現在価格</p>
              <p className="font-mono text-3xl font-bold">
                ¥{formatNumber(stock.price)}
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">前日比</p>
                <p
                  className={`font-mono text-lg ${changeData.isPositive ? "text-red-600" : "text-blue-600"}`}
                >
                  {changeData.change}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">騰落率</p>
                <p
                  className={`font-mono text-lg ${changeData.isPositive ? "text-red-600" : "text-blue-600"}`}
                >
                  {changeData.percent}
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">出来高</p>
                <p className="font-mono text-lg">
                  {formatNumber(stock.volume)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">時価総額</p>
                <p className="font-mono text-lg">{stock.marketCap}</p>
              </div>
            </div>
            <Separator /> */}
            <div>
              <p className="text-sm text-gray-600">業種</p>
              <Badge variant="secondary" className="mt-1">
                {stock.sector}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>メタデータ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <p className="text-gray-600">作成日時</p>
              <p>{stock.createdAt.toLocaleString("ja-JP")}</p>
            </div>
            <div>
              <p className="text-gray-600">最終更新日時</p>
              <p>{stock.updatedAt.toLocaleString("ja-JP")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
