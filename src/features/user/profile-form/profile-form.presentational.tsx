"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, Button } from "@/components/ui";

import { profileFormSchema } from "../schema";
import { updateUserProfile } from "../repositories";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  username: string;
};

export function ProfileForm(props: Props) {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: props.username,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">プロフィール編集</h1>
      </div>
      <Card className="mx-auto max-w-2xl">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateUserProfile)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>アカウント名</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">更新</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
