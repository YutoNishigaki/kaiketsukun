"use client";

import { SubmitButton, Input, Label } from "@/components/ui";
import Link from "next/link";
import { signIn } from "@/features/auth/repositories";
import { ROUTING_PATHS } from "@/constants/paths";

export function SignInForm() {
  return (
    <form className="grid gap-6">
      <div className="grid gap-10">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input name="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">パスワード</Label>
            <Input name="password" type="password" required />
          </div>
        </div>
        <SubmitButton
          className="w-full"
          pendingText="サインイン中..."
          formAction={signIn}
        >
          サインイン
        </SubmitButton>
      </div>
      <div className="text-center text-sm">
        <Link
          href={ROUTING_PATHS.auth.signup}
          className="underline underline-offset-4"
        >
          新規登録はこちら
        </Link>
      </div>
    </form>
  );
}
