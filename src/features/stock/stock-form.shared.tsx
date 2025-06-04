"use client";

import { useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockFormSchema, type StockForm } from "@/features/stock/schema";

import { ROUTING_PATHS } from "@/constants/paths";
import { SECTORS } from "@/features/stock/constants";
import { createStock, updateStock } from "@/features/stock/repositories";

import { Button, SubmitButton, Input, ConfirmDialog } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

type StockFormProps = {
  stock?: StockForm & { id: string };
  mode: "create" | "edit";
};

export default function StockForm({ stock, mode }: StockFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<StockForm>({
    resolver: zodResolver(stockFormSchema),
    defaultValues: {
      stockCode: stock?.stockCode || "",
      stockName: stock?.stockName || "",
      sector: stock?.sector || "",
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    form.handleSubmit(async (values) => {
      try {
        switch (mode) {
          case "create":
            const { stockName: createStockName } = await createStock(values);
            toast.success(`銘柄：${createStockName} を登録しました。`);

            break;
          case "edit":
            if (!stock?.id) {
              // 編集モードで銘柄IDが指定されないことはありえない
              throw new Error("銘柄IDが指定されていません");
            }

            const { stockName: updateStockName } = await updateStock(
              stock.id,
              values,
            );
            toast.success(`銘柄：${updateStockName} を更新しました。`);

            break;
          default:
            throw new Error("不正な操作");
        }
      } catch {
        toast.error(`${mode === "create" ? "登録" : "更新"}に失敗しました`);
      }
    })();
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent>
        <Form {...form}>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="stockCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>銘柄コード</FormLabel>
                  <FormControl>
                    <Input placeholder="9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>銘柄名</FormLabel>
                  <FormControl>
                    <Input placeholder="〇〇株式会社" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>セクター</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="セクターを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SECTORS.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              {mode === "create" && (
                <SubmitButton type="submit" pendingText="登録中...">
                  登録
                </SubmitButton>
              )}
              {mode === "edit" && (
                <ConfirmDialog
                  triggerComponent={<Button type="button">更新</Button>}
                  description="銘柄情報の更新をします。この操作は取り消せません。"
                  positiveButtonType="submit"
                  positiveButtonAction={() => formRef.current?.requestSubmit()}
                />
              )}
              <Link href={ROUTING_PATHS.stock.stock.root}>
                <Button type="button" variant="outline">
                  キャンセル
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
