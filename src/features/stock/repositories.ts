"use server";

import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/helpers/get-authenticated-user";

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
