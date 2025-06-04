import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">銘柄が見つかりません</h1>
        <p className="mt-2 text-gray-600">
          指定された銘柄は存在しないか、削除されています。
        </p>
        <Link href="/stock">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            一覧に戻る
          </Button>
        </Link>
      </div>
    </div>
  );
}
