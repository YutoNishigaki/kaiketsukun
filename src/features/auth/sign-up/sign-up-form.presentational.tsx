"use client";

import { SubmitButton, Input, Label } from "@/components/ui";
import Link from "next/link";
import { signUp } from "@/repositories/auth";
import { ROUTING_PATHS } from "@/constants/paths";

export function SignUpForm() {
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
          pendingText="サインアップ中..."
          formAction={signUp}
        >
          サインアップ
        </SubmitButton>
      </div>
      <div className="text-center text-sm">
        <Link
          href={ROUTING_PATHS.auth.signin}
          className="underline underline-offset-4"
        >
          サインインはこちら
        </Link>
      </div>
    </form>
  );
}
