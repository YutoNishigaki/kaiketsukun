"use client";
// TODO: 仮でuse clientをつけているが、のちのちはUIイベントハンドラーはファイルを分けてこのファイル自体はSSRにする

import { Button } from "@/components/ui";
import { signOutAction } from "@/features/auth/actions";

export default function Root() {
  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1>ダッシュボード</h1>
      <Button onClick={() => signOutAction()}>サインアウト</Button>
    </div>
  );
}
