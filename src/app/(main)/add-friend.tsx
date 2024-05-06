"use client";

import { ChatAppContext } from "@/components/providers/chatapp.provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import Image from "next/image";
import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { z } from "zod";

const addFriendSchema = z.object({
  friend_name: z.string().refine((val) => !!val.trim(), "Field required"),
  friend_key: z.string().refine((val) => !!val.trim(), "Field required"),
});
type AddFriendType = z.infer<typeof addFriendSchema>;

const AddFrined: FC = () => {
  const { addFriend } = useContext(ChatAppContext);
  const [loading, setLoading] = useState(false);
  const form = useForm<AddFriendType>({
    resolver: zodResolver(addFriendSchema),
    defaultValues: {
      friend_name: "",
      friend_key: "",
    },
  });

  async function onSubmit(values: AddFriendType) {
    setLoading(true);
    await addFriend(values.friend_key, values.friend_name);
    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger className="size-10 flex-shrink-0 flex justify-center items-center border-[1px] rounded-md border-slate-600 hover:border-blue-800 bg-gray-700/50 hover:ring-white/15 text-white">
        <Plus className="size-6" />
      </DialogTrigger>
      <DialogContent
        closeable
        className="overflow-hidden text-white outline-none shadow-sky-500/30 bg-slate-950 border-sky-800 sm:rounded-[1.75rem]"
      >
        <div className="relative w-full isolate flex flex-col items-center justify-center gap-9 py-9">
          <Image
            alt="auth background image"
            src="/auth-bg.svg"
            width={500}
            height={500}
            className="fixed left-0 top-0 -z-10 h-full w-full object-cover"
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-xs flex flex-col gap-9"
            >
              <h3 className="text-2xl font-bold text-left text-white">
                Add Friend
              </h3>
              <div className="flex w-full flex-col items-start gap-3">
                <FormField
                  control={form.control}
                  name="friend_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-white">Name</FormLabel>
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
                <FormField
                  control={form.control}
                  name="friend_key"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-white">Public Key</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Key"
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
                  Add Friend
                </Button>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFrined;
