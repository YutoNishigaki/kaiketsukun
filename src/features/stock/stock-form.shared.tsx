"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockFormSchema, type StockForm } from "@/features/stock/schema";

import { ROUTING_PATHS } from "@/constants/paths";
import { SECTORS } from "@/features/stock/constants";
import { createStock } from "@/features/stock/repositories";

import { Button, Input } from "@/components/ui";
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
  stock?: StockForm;
  mode: "create" | "edit";
};

export default function StockForm({ stock, mode }: StockFormProps) {
  const form = useForm<StockForm>({
    resolver: zodResolver(stockFormSchema),
    defaultValues: {
      stockCode: stock?.stockCode || "",
      stockName: stock?.stockName || "",
      sector: stock?.sector || "",
    },
  });

  const onHandleSubmit = async (values: StockForm) => {
    try {
      await createStock(values);
      toast.success(`${mode === "create" ? "登録" : "更新"}が完了しました`);
    } catch {
      toast.error(`${mode === "create" ? "登録" : "更新"}に失敗しました`);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="space-y-8"
          >
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
              <Button type="submit">
                {mode === "create" ? "登録" : "更新"}
              </Button>
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
