"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * supabaseの認証済みユーザーを取得する
 * auth.usersテーブルのuser_idをアプリケーション内の認証済みユーザーの識別IDとして使用している
 *
 * @returns userId 認証済みユーザーの識別ID
 */
export const getAuthenticatedUser = async () => {
  try {
    const supabase = await createClient();
    const authenticatedUser = await supabase.auth.getUser();

    // 認証済みユーザーの取得に失敗
    if (authenticatedUser.error) {
      throw new Error(
        "認証済みユーザーの取得に失敗しました: " +
          authenticatedUser.error.message
      );
    }

    const { id: userId } = authenticatedUser.data.user;

    return userId;
  } catch (error) {
    throw error;
  }
};
