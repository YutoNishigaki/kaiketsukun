export const dynamic = "force-dynamic";

import { StockEditContainer } from "@/features/stock/edit";

type Props = {
  params: {
    id: string;
  };
};

export default function EditStockPage(props: Props) {
  const { id } = props.params;

  return <StockEditContainer id={id} />;
}
