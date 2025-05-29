"use client";

import { z } from "zod";

export const profileFormSchema = z.object({
  username: z.string().min(2).max(50),
});
