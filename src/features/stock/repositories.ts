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

    const result = await prisma.stock.create({
      data: {
        userId,
        stockCode: values.stockCode,
        stockName: values.stockName,
        sector: values.sector,
      },
    });

    // 表示を更新するためにキャッシュを再検証
    revalidatePath("/stock");
    return result;
  } catch (error) {
    throw new Error("銘柄の登録に失敗しました: " + error);
  }
};

/**
 * IDに対応する銘柄の詳細情報を取得する
 * @returns 銘柄情報の詳細
 */
export const fetchStockById = async (stockId: string) => {
  try {
    const stock = await prisma.stock.findUnique({
      select: {
        stockCode: true,
        stockName: true,
        sector: true,
      },
      where: {
        stockId,
      },
    });

    if (!stock) {
      throw new Error("銘柄が見つかりません");
    }

    return stock;
  } catch (error) {
    throw new Error("銘柄情報の取得に失敗しました: " + error);
  }
};

/**
 * IDに対応する銘柄を更新する
 * @param stockId 銘柄ID
 * @param stockCode 銘柄コード
 * @param stockName 銘柄名
 * @param sector 業種
 * @return 更新した銘柄情報
 */
export const updateStock = async (stockId: string, values: StockForm) => {
  try {
    const result = await prisma.stock.update({
      where: {
        stockId,
      },
      data: {
        stockCode: values.stockCode,
        stockName: values.stockName,
        sector: values.sector,
      },
    });

    if (!result) {
      throw new Error("銘柄が見つかりません");
    }

    // 表示を更新するためにキャッシュを再検証
    revalidatePath("/stock");
    return result;
  } catch (error) {
    throw new Error("銘柄の更新に失敗しました: " + error);
  }
};

/**
 * IDに対応する銘柄を削除する
 * @param stockId 銘柄ID
 * @return 削除した銘柄情報
 */
export const deleteStock = async (stockId: string) => {
  try {
    const result = await prisma.stock.delete({
      where: {
        stockId,
      },
    });

    if (!result) {
      throw new Error("銘柄が見つかりません");
    }

    // 表示を更新するためにキャッシュを再検証
    revalidatePath("/stock");
    return result;
  } catch (error) {
    throw new Error("銘柄の削除に失敗しました: " + error);
  }
};
