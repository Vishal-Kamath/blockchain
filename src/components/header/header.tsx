"use client";

import Image from "next/image";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { ChatAppContext } from "@/components/providers/chatapp.provider";
import Link from "next/link";
import { Plus, RotateCcw } from "lucide-react";

interface User {
  address: string;
  username: string;
  registed: boolean;
}
const Header: FC = () => {
  const { userName, registered, account } = useContext(ChatAppContext);

  return (
    <header className="flex justify-between items-center gap-6 padding-x h-24">
      <div className="w-full z-10 flex items-center gap-3 max-w-xs">
        <Image
          alt="logo"
          src="/icon.svg"
          width={300}
          height={300}
          className="size-6 lg:size-10"
        />
        <h1 className="text-xl lg:text-2xl font-bold text-white">BlockChat</h1>
      </div>

      <div className="flex gap-2 w-full max-w-sm justify-end items-center">
        {registered ? (
          <div className="w-full px-2 py-1 max-w-[20rem] text-right flex flex-col">
            <p className="text-white text-sm">{userName}</p>
            <span className="text-xs text-slate-600 max-w-[20rem] truncate">
              {account}
            </span>
          </div>
        ) : (
          <Link
            href="/auth/register"
            className="text-sm w-full h-9 flex items-center justify-center text-white max-w-[10rem] hover:bg-slate-800 bg-slate-900 rounded-md"
          >
            Register
          </Link>
        )}
        <button
          onClick={() => window.location.reload()}
          className="size-9 flex-shrink-0 flex justify-center items-center rounded-md bg-slate-900 hover:bg-slate-800 text-white"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
