export const dynamic = "force-dynamic";

import { StockDetailContainer } from "@/features/stock/detail";

type Params = {
  id: string;
};

export default async function DetailStockPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  return <StockDetailContainer id={id} />;
}
