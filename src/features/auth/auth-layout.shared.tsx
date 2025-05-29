"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type AuthLayoutProps = {
  title: string;
  formContent: React.ReactNode;
};

export function AuthLayout({ title, formContent }: AuthLayoutProps) {
  return (
    <Card className="min-w-sm min-h-[480px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  );
}
