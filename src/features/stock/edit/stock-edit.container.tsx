import { StockEdit } from "./stock-edit.presentational";
import { fetchStockById } from "../repositories";

type StockEditContainerProps = {
  id: string;
};

export async function StockEditContainer({ id }: StockEditContainerProps) {
  const stock = await fetchStockById(id);

  return <StockEdit stock={{ id, ...stock }} />;
}
