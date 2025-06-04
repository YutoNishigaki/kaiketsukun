"use client";

import { ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  triggerComponent: ReactNode;
  title?: string;
  description?: string;
  nagativeLabel?: string;
  positiveLabel?: string;
  positiveButtonVariant?: VariantProps<typeof buttonVariants>["variant"];
  positiveButtonType?: "button" | "submit" | "reset";
  positiveButtonAction?: () => void;
};

export function ConfirmDialog({
  triggerComponent,
  title = "確認",
  description = "操作を継続しますか？",
  nagativeLabel = "キャンセル",
  positiveLabel = "OK",
  positiveButtonVariant = "default",
  positiveButtonType = "button",
  positiveButtonAction,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{nagativeLabel}</AlertDialogCancel>
          <AlertDialogAction
            variant={positiveButtonVariant}
            type={positiveButtonType}
            onClick={positiveButtonAction}
          >
            {positiveLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
