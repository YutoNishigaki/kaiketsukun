"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTING_PATHS } from "@/constants/paths";

/**
 * サインアップ処理
 * @param formData
 * @returns
 */
export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();

  if (!email || !password) {
    console.log("メールアドレスまたはパスワードがありません");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return;
  } else {
    return redirect(ROUTING_PATHS.root);
  }
};

/**
 * サインイン処理
 * @param formData
 * @returns
 */
export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return;
  }

  return redirect(ROUTING_PATHS.root);
};

/**
 * サインアウト処理
 * @returns
 */
export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect(ROUTING_PATHS.auth.signin);
};
