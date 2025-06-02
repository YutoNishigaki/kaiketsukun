"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  addStock,
  updateStock,
  isCodeDuplicate,
  type Stock,
} from "@/store/stock";

interface StockFormProps {
  stock?: Stock;
  mode: "create" | "edit";
}

const sectors = [
  "輸送用機器",
  "電気機器",
  "情報・通信業",
  "医薬品",
  "銀行業",
  "その他製品",
  "サービス業",
  "化学",
  "機械",
  "食料品",
  "小売業",
  "不動産業",
  "建設業",
  "鉄鋼",
  "非鉄金属",
  "石油・石炭製品",
  "ガラス・土石製品",
  "繊維製品",
  "パルプ・紙",
  "ゴム製品",
  "陸運業",
  "海運業",
  "空運業",
  "倉庫・運輸関連業",
  "卸売業",
  "証券・商品先物取引業",
  "保険業",
  "その他金融業",
  "精密機器",
  "その他",
];

export default function StockForm({ stock, mode }: StockFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: stock?.code || "",
    name: stock?.name || "",
    price: stock?.price?.toString() || "",
    change: stock?.change?.toString() || "",
    changePercent: stock?.changePercent?.toString() || "",
    volume: stock?.volume?.toString() || "",
    marketCap: stock?.marketCap || "",
    sector: stock?.sector || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = "銘柄コードは必須です";
    } else if (!/^\d{4}$/.test(formData.code)) {
      newErrors.code = "銘柄コードは4桁の数字で入力してください";
    } else if (isCodeDuplicate(formData.code, stock?.id)) {
      newErrors.code = "この銘柄コードは既に登録されています";
    }

    if (!formData.name.trim()) {
      newErrors.name = "銘柄名は必須です";
    }

    if (!formData.price.trim()) {
      newErrors.price = "現在価格は必須です";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "正の数値を入力してください";
    }

    if (!formData.change.trim()) {
      newErrors.change = "前日比は必須です";
    } else if (isNaN(Number(formData.change))) {
      newErrors.change = "数値を入力してください";
    }

    if (!formData.changePercent.trim()) {
      newErrors.changePercent = "騰落率は必須です";
    } else if (isNaN(Number(formData.changePercent))) {
      newErrors.changePercent = "数値を入力してください";
    }

    if (!formData.volume.trim()) {
      newErrors.volume = "出来高は必須です";
    } else if (isNaN(Number(formData.volume)) || Number(formData.volume) < 0) {
      newErrors.volume = "0以上の数値を入力してください";
    }

    if (!formData.marketCap.trim()) {
      newErrors.marketCap = "時価総額は必須です";
    }

    if (!formData.sector) {
      newErrors.sector = "業種を選択してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const stockData = {
        code: formData.code,
        name: formData.name,
        price: Number(formData.price),
        change: Number(formData.change),
        changePercent: Number(formData.changePercent),
        volume: Number(formData.volume),
        marketCap: formData.marketCap,
        sector: formData.sector,
      };

      if (mode === "create") {
        addStock(stockData);
        toast("登録完了", {
          description: `${stockData.name}を登録しました。`,
        });
      } else if (stock) {
        updateStock(stock.id, stockData);
        toast("更新完了", {
          description: `${stockData.name}を更新しました。`,
        });
      }

      router.push("/stock");
    } catch {
      toast("エラー", {
        description: "処理中にエラーが発生しました。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{mode === "create" ? "新規銘柄登録" : "銘柄編集"}</CardTitle>
        <CardDescription>
          {mode === "create"
            ? "新しい銘柄情報を入力してください。"
            : "銘柄情報を編集してください。"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">銘柄コード *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                placeholder="例: 7203"
                maxLength={4}
              />
              {errors.code && (
                <p className="text-sm text-red-600">{errors.code}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">銘柄名 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="例: トヨタ自動車"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">現在価格 (円) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="例: 2845"
                min="0"
                step="0.01"
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="change">前日比 (円) *</Label>
              <Input
                id="change"
                type="number"
                value={formData.change}
                onChange={(e) => handleInputChange("change", e.target.value)}
                placeholder="例: 45"
                step="0.01"
              />
              {errors.change && (
                <p className="text-sm text-red-600">{errors.change}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="changePercent">騰落率 (%) *</Label>
              <Input
                id="changePercent"
                type="number"
                value={formData.changePercent}
                onChange={(e) =>
                  handleInputChange("changePercent", e.target.value)
                }
                placeholder="例: 1.61"
                step="0.01"
              />
              {errors.changePercent && (
                <p className="text-sm text-red-600">{errors.changePercent}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">出来高 *</Label>
              <Input
                id="volume"
                type="number"
                value={formData.volume}
                onChange={(e) => handleInputChange("volume", e.target.value)}
                placeholder="例: 12500000"
                min="0"
              />
              {errors.volume && (
                <p className="text-sm text-red-600">{errors.volume}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketCap">時価総額 *</Label>
              <Input
                id="marketCap"
                value={formData.marketCap}
                onChange={(e) => handleInputChange("marketCap", e.target.value)}
                placeholder="例: 38.2兆円"
              />
              {errors.marketCap && (
                <p className="text-sm text-red-600">{errors.marketCap}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sector">業種 *</Label>
              <Select
                value={formData.sector}
                onValueChange={(value) => handleInputChange("sector", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="業種を選択" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.sector && (
                <p className="text-sm text-red-600">{errors.sector}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "処理中..." : mode === "create" ? "登録" : "更新"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
