"use client";

import { useState } from "react";
import Link from "next/link";

import { ROUTING_PATHS } from "@/constants/paths";
import { deleteStock } from "@/features/stock/repositories";

import { Button, Badge, ConfirmDialog } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { ArrowUpDown, Plus, Edit, Trash2, Eye } from "lucide-react";

type SortField =
  | "code"
  | "name"
  | "price"
  | "change"
  | "changePercent"
  | "volume";
type SortDirection = "asc" | "desc";

type Props = {
  stocks: {
    stockId: string;
    stockCode: string;
    stockName: string;
    sector: string;
  }[];
};

export function StockList({ stocks }: Props) {
  // const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("code");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);

  // フィルタリングとソート
  // const filteredAndSortedData = useMemo(() => {
  //   const filtered = stocks.filter(
  //     (stock) =>
  //       stock.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       stock.sector.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   filtered.sort((a, b) => {
  //     let aValue = a[sortField];
  //     let bValue = b[sortField];

  //     if (typeof aValue === "string") {
  //       aValue = aValue.toLowerCase();
  //       bValue = (bValue as string).toLowerCase();
  //     }

  //     if (sortDirection === "asc") {
  //       return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
  //     } else {
  //       return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
  //     }
  //   });

  //   return filtered;
  // }, [stocks, searchTerm, sortField, sortDirection]);

  // ページネーション
  // const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedData = filteredAndSortedData.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { stockName } = await deleteStock(id);

      toast.success(`銘柄：${stockName} を削除しました。`);
    } catch {
      toast.error("削除に失敗しました。");
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("ja-JP");
  };

  // const formatChange = (change: number, changePercent: number) => {
  //   const isPositive = change >= 0;
  //   const sign = isPositive ? "+" : "";
  //   return {
  //     change: `${sign}${formatNumber(change)}`,
  //     percent: `${sign}${changePercent.toFixed(2)}%`,
  //     isPositive,
  //   };
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">銘柄管理</h1>
        </div>
        <Link href={ROUTING_PATHS.stock.stock.new}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規登録
          </Button>
        </Link>
      </div>

      {/* 検索とフィルター */}
      {/* <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="銘柄コード、銘柄名、業種で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => setItemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5件</SelectItem>
            <SelectItem value="10">10件</SelectItem>
            <SelectItem value="20">20件</SelectItem>
            <SelectItem value="50">50件</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      {/* データテーブル */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("code")}
                  className="h-auto p-0 font-semibold"
                >
                  銘柄コード
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="h-auto p-0 font-semibold"
                >
                  銘柄名
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("price")}
                  className="h-auto p-0 font-semibold"
                >
                  現在価格
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("change")}
                  className="h-auto p-0 font-semibold"
                >
                  前日比
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("volume")}
                  className="h-auto p-0 font-semibold"
                >
                  出来高
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>業種</TableHead>
              <TableHead className="text-right">時価総額</TableHead>
              <TableHead className="text-center">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((stock) => {
              // const changeData = formatChange(
              //   stock.change,
              //   stock.changePercent
              // );
              return (
                <TableRow key={stock.stockId} className="hover:bg-gray-50">
                  <TableCell className="font-mono font-medium">
                    {stock.stockCode}
                  </TableCell>
                  <TableCell className="font-medium">
                    {stock.stockName}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ¥{formatNumber(0)} {/* TODO: 現在価格 */}
                  </TableCell>
                  <TableCell className="text-right">
                    {/* <div
                      className={`font-mono ${changeData.isPositive ? "text-red-600" : "text-blue-600"}`}
                    > */}
                    <div>{0}</div> {/* TODO: 前日比 */}
                    <div className="text-sm">({0})</div> {/* TODO: 前日比(%) */}
                    {/* </div> */}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatNumber(0)} {/* TODO: 出来高 */}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {stock.sector}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {0} {/* TODO: 時価総額 */}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/stock/${stock.stockId}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/stock/${stock.stockId}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <ConfirmDialog
                        triggerComponent={
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                        title="銘柄を削除しますか？"
                        description={`${stock.stockName} (${stock.stockCode})を削除します。この操作は取り消せません。`}
                        positiveLabel="削除"
                        positiveButtonVariant={"destructive"}
                        positiveButtonAction={() => handleDelete(stock.stockId)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* ページネーション */}
      {/* <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {filteredAndSortedData.length}件中 {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)}
          件を表示
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            前へ
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            次へ
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div> */}
    </div>
  );
}
