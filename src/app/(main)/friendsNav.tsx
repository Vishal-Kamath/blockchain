"use client";

import { ChatAppContext } from "@/components/providers/chatapp.provider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FC, useContext, useState } from "react";
import AddFrined from "./add-friend";

const FriendsNav: FC = () => {
  const { friendList, selectFriend, selectedFriend } =
    useContext(ChatAppContext);

  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Input
          className="border-gray-600 text-white bg-gray-700/50 focus-visible:ring-white/15"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search friends..."
        />
        <AddFrined />
      </div>
      <nav className="flex flex-col rounded-md overflow-hidden">
        {friendList
          .filter(
            (friend) =>
              friend.name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()) ||
              friend.pubkey
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
          )
          .map((friend, index) => (
            <button
              key={friend.pubkey + index}
              onClick={() => selectFriend(friend.pubkey)}
              className={cn(
                "flex flex-col py-2 px-4 border-b-[1px] last:border-b-0 border-slate-600 gap-1",
                friend.pubkey === selectedFriend
                  ? "bg-sky-950"
                  : "bg-slate-950 hover:bg-slate-900"
              )}
            >
              <span
                className={cn(
                  "text-sm",
                  friend.pubkey === selectedFriend
                    ? "text-white"
                    : "text-slate-300"
                )}
              >
                {friend.name}
              </span>
              <p className="text-xs text-slate-500 truncate max-w-full">
                {friend.pubkey}
              </p>
            </button>
          ))}
      </nav>
    </div>
  );
};

export default FriendsNav;
