"use server";

import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";

/**
 * supabaseの認証済みユーザー情報からアカウント詳細を取得する
 * @returns 認証済みユーザー情報
 */
export const getAuthenticatedUser = async () => {
  const supabase = await createClient();
  const authenticatedUser = await supabase.auth.getUser();

  if (authenticatedUser.error) {
    console.error(
      "認証済みユーザーの取得に失敗しました:",
      authenticatedUser.error.message
    );
    return;
  }

  const { id: userId } = authenticatedUser.data.user;

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userId: true,
      userName: true,
    },
  });

  return user;
};
