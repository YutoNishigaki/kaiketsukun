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
      url: "#",
      icon: ChartCandlestickIcon,
    },
    {
      title: "Holding",
      url: "#",
      icon: ReceiptJapaneseYenIcon,
    },
    {
      title: "DividendHistory",
      url: "#",
      icon: HistoryIcon,
    },
    {
      title: "TradeHistory",
      url: "#",
      icon: HistoryIcon,
    },
  ],
};
