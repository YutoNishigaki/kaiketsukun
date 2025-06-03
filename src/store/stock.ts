"use client";

// 株式データの型定義
export interface Stock {
  id: string;
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
  createdAt: Date;
  updatedAt: Date;
}

// 初期データ
const initialStocks: Stock[] = [
  {
    id: "1",
    code: "7203",
    name: "トヨタ自動車",
    price: 2845,
    change: 45,
    changePercent: 1.61,
    volume: 12500000,
    marketCap: "38.2兆円",
    sector: "輸送用機器",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    code: "6758",
    name: "ソニーグループ",
    price: 13420,
    change: -180,
    changePercent: -1.32,
    volume: 3200000,
    marketCap: "16.8兆円",
    sector: "電気機器",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    code: "9984",
    name: "ソフトバンクグループ",
    price: 7890,
    change: 120,
    changePercent: 1.54,
    volume: 8900000,
    marketCap: "11.5兆円",
    sector: "情報・通信業",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    code: "6861",
    name: "キーエンス",
    price: 48500,
    change: -500,
    changePercent: -1.02,
    volume: 450000,
    marketCap: "9.3兆円",
    sector: "電気機器",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    code: "4519",
    name: "中外製薬",
    price: 4285,
    change: 85,
    changePercent: 2.02,
    volume: 1800000,
    marketCap: "7.2兆円",
    sector: "医薬品",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

// ローカルストレージのキー
const STORAGE_KEY = "stock-management-data";

// ストレージからデータを取得
export function getStocks(): Stock[] {
  if (typeof window === "undefined") return initialStocks;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return parsed.map((stock: any) => ({
        ...stock,
        createdAt: new Date(stock.createdAt),
        updatedAt: new Date(stock.updatedAt),
      }));
    }
  } catch (error) {
    console.error("Failed to load stocks from storage:", error);
  }

  // 初期データをストレージに保存
  saveStocks(initialStocks);
  return initialStocks;
}

// ストレージにデータを保存
export function saveStocks(stocks: Stock[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
  } catch (error) {
    console.error("Failed to save stocks to storage:", error);
  }
}

// 新しい銘柄を追加
export function addStock(
  stockData: Omit<Stock, "id" | "createdAt" | "updatedAt">,
): Stock {
  const stocks = getStocks();
  const newStock: Stock = {
    ...stockData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const updatedStocks = [...stocks, newStock];
  saveStocks(updatedStocks);
  return newStock;
}

// 銘柄を更新
export function updateStock(
  id: string,
  stockData: Partial<Omit<Stock, "id" | "createdAt" | "updatedAt">>,
): Stock | null {
  const stocks = getStocks();
  const index = stocks.findIndex((stock) => stock.id === id);

  if (index === -1) return null;

  const updatedStock: Stock = {
    ...stocks[index],
    ...stockData,
    updatedAt: new Date(),
  };

  const updatedStocks = [...stocks];
  updatedStocks[index] = updatedStock;
  saveStocks(updatedStocks);
  return updatedStock;
}

// 銘柄を削除
export function deleteStock(id: string): boolean {
  const stocks = getStocks();
  const filteredStocks = stocks.filter((stock) => stock.id !== id);

  if (filteredStocks.length === stocks.length) return false;

  saveStocks(filteredStocks);
  return true;
}

// IDで銘柄を取得
export function getStockById(id: string): Stock | null {
  const stocks = getStocks();
  return stocks.find((stock) => stock.id === id) || null;
}

// 銘柄コードの重複チェック
export function isCodeDuplicate(code: string, excludeId?: string): boolean {
  const stocks = getStocks();
  return stocks.some((stock) => stock.code === code && stock.id !== excludeId);
}
