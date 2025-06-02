import { ROUTING_PATHS } from "@/constants/paths";

import {
  LayoutDashboardIcon,
  ChartCandlestickIcon,
  ReceiptJapaneseYenIcon,
  HistoryIcon,
} from "lucide-react";

export const NAV_HOME = {
  groupLabel: "",
  items: [
    {
      title: "Dashboard",
      url: ROUTING_PATHS.dashboard.root,
      icon: LayoutDashboardIcon,
    },
  ],
};

export const NAV_STOCK = {
  groupLabel: "Stock",
  items: [
    {
      title: "Stock",
      url: ROUTING_PATHS.stock.root,
      icon: ChartCandlestickIcon,
    },
    {
      title: "Holding",
      url: ROUTING_PATHS.stock.holding,
      icon: ReceiptJapaneseYenIcon,
    },
    {
      title: "DividendHistory",
      url: ROUTING_PATHS.stock.dividendHistory,
      icon: HistoryIcon,
    },
    {
      title: "TradeHistory",
      url: ROUTING_PATHS.stock.tradeHistory,
      icon: HistoryIcon,
    },
  ],
};
