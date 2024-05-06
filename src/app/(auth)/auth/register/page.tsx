"use client";

import { FC, useContext, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatAppContext } from "@/components/providers/chatapp.provider";
import { Input } from "@/components/ui/input";

const registerSchema = z.object({
  username: z.string().refine((val) => !!val.trim(), "Field required"),
});
type RegisterType = z.infer<typeof registerSchema>;

const RegisterPage: FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { createAccount, fetchData, registered } = useContext(ChatAppContext);

  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: RegisterType) {
    setLoading(true);
    await createAccount(values.username);
    setLoading(false);
  }

  useEffect(() => {
    if (registered) {
      router.push("/");
    }
  }, [registered]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full z-10 max-w-sm flex-col items-start gap-6 text-white"
      >
        <div className="flex w-full flex-col items-start gap-2">
          <h2 className="text-2xl font-semibold">Register</h2>
          <div className="flex gap-1 text-sm text-gray-500">
            <span>Back to </span>
            <Link
              href={`/`}
              className="font-semibold hover:text-white hover:underline"
            >
              Home
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="border-gray-600 bg-gray-700/50 focus-visible:ring-white/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {loading ? (
          <Button
            disabled
            className="w-full bg-gray-100/20 text-white hover:bg-white/30"
          >
            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-gray-100/20 text-white hover:bg-white/30"
          >
            Register
          </Button>
        )}
        <Separator className="w-full shrink bg-gray-500" />

        <div className="flex gap-1 text-sm text-gray-400">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="font-semibold p-0 bg-transparent outline-none border-none hover:text-white underline-offset-2 underline"
          >
            Reload this page
          </button>
          <span> once the transaction is complete. </span>
        </div>
      </form>
    </Form>
  );
};

export default RegisterPage;
