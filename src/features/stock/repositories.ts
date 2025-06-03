"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

import { getAuthenticatedUser } from "@/helpers/get-authenticated-user";
import { type StockForm } from "@/features/stock/schema";

/**
 * ログイン中のユーザーの銘柄情報を取得する
 * @returns 銘柄情報の一覧
 */
export const fetchUserStocks = async () => {
  try {
    const userId = await getAuthenticatedUser();

    const stocks = await prisma.stock.findMany({
      select: {
        stockId: true,
        stockCode: true,
        stockName: true,
        sector: true,
      },
      where: {
        userId,
      },
      orderBy: {
        stockCode: "asc",
      },
    });

    return stocks;
  } catch (error) {
    throw new Error("銘柄情報の取得に失敗しました: " + error);
  }
};

/**
 * 銘柄を新規登録する
 * @param stockCode 銘柄コード
 * @param stockName 銘柄名
 * @param sector 業種
 * @returns 登録した銘柄情報
 */
export const createStock = async (values: StockForm) => {
  try {
    const userId = await getAuthenticatedUser();

    await prisma.stock.create({
      data: {
        userId,
        stockCode: values.stockCode,
        stockName: values.stockName,
        sector: values.sector,
      },
    });

    // 表示を更新するためにキャッシュを再検証
    revalidatePath("/stock");
  } catch (error) {
    throw new Error("銘柄の登録に失敗しました: " + error);
  }
};
