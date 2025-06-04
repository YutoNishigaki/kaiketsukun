import { StockDetail } from "./stock-detail.presentational";
import { fetchStockById } from "@/features/stock/repositories";

type StockEditContainerProps = {
  id: string;
};

export async function StockDetailContainer({ id }: StockEditContainerProps) {
  const stock = await fetchStockById(id);

  return <StockDetail stock={stock} />;
}
