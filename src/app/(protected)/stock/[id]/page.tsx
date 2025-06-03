"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { getStockById, deleteStock, type Stock } from "@/store/stock";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function StockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const stockData = getStockById(id);
    setStock(stockData);
    setLoading(false);
  }, [params.id]);

  const handleDelete = async () => {
    if (!stock) return;

    try {
      const success = deleteStock(stock.id);
      if (success) {
        toast("削除完了", {
          description: `${stock.name}を削除しました。`,
        });
        router.push("/stock");
      } else {
        toast("削除失敗", {
          description: "銘柄の削除に失敗しました。",
        });
      }
    } catch {
      toast("エラー", {
        description: "削除処理中にエラーが発生しました。",
      });
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("ja-JP");
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    const sign = isPositive ? "+" : "";
    return {
      change: `${sign}${formatNumber(change)}`,
      percent: `${sign}${changePercent.toFixed(2)}%`,
      isPositive,
    };
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!stock) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">銘柄が見つかりません</h1>
          <p className="mt-2 text-gray-600">
            指定された銘柄は存在しないか、削除されています。
          </p>
          <Link href="/stock">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              一覧に戻る
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const changeData = formatChange(stock.change, stock.changePercent);

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
            <h1 className="text-2xl font-bold">{stock.name}</h1>
            <p className="text-gray-600">銘柄コード: {stock.code}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/stock/${stock.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Trash2 className="mr-2 h-4 w-4" />
                削除
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>銘柄を削除しますか？</AlertDialogTitle>
                <AlertDialogDescription>
                  {stock.name} ({stock.code})
                  を削除します。この操作は取り消せません。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  削除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
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
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
            <Separator />
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
