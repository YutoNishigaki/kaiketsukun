"use client";

import { z } from "zod";

export const stockFormSchema = z.object({
  stockCode: z.string().min(2).max(50),
  stockName: z.string().min(2).max(50),
  sector: z.string().min(2).max(50),
});

export type StockForm = z.infer<typeof stockFormSchema>;
