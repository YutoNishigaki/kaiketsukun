export const dynamic = "force-dynamic";

import { StockEditContainer } from "@/features/stock/edit";

type Params = {
  id: string;
};

export default async function EditStockPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  return <StockEditContainer id={id} />;
}
