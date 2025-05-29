"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

import { profileFormSchema } from "./schema";
import { getAuthenticatedUser } from "@/helpers/get-authenticated-user";

/**
 * ログイン中ユーザーのユーザー情報を取得する
 * @returns ユーザー情報
 */
export const fetchUser = async () => {
  try {
    const userId = await getAuthenticatedUser();

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        userName: true,
      },
    });

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    return user;
  } catch (error) {
    throw new Error("ユーザー情報の取得に失敗しました: " + error);
  }
};

/**
 * ユーザーのプロフィールを更新する
 * @param profileFormSchema(Zod)
 * @returns
 */
export const updateUserProfile = async (
  values: z.infer<typeof profileFormSchema>
) => {
  try {
    const userId = await getAuthenticatedUser();

    await prisma.user.update({
      where: { userId },
      data: { userName: values.username },
    });

    // 表示を更新するためにキャッシュを再検証
    revalidatePath("/");
  } catch (error) {
    throw new Error("プロフィールの更新に失敗しました: " + error);
  }
};
