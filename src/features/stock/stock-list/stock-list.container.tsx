import { StockList } from "./stock-list.presentational";
import { fetchUserStocks } from "../repositories";

export async function StockListContainer() {
  const stocks = await fetchUserStocks();

  return <StockList stocks={stocks} />;
}
