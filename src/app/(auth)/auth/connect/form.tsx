"use client";

import { FC, useContext } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChatAppContext } from "@/components/providers/chatapp.provider";

const ConnectForm: FC = () => {
  const { connectWallet } = useContext(ChatAppContext);

  return (
    <div className="flex flex-col w-full max-w-xs gap-6 items-center text-white">
      <div className="flex w-full flex-col items-start pb-3 gap-2">
        <h2 className="text-2xl font-semibold">Connect</h2>

        <p className="text-sm text-gray-500">
          To connect to metamask click on the button below.
        </p>
      </div>

      <Image
        src="/metamask.png"
        alt="metamask"
        width={200}
        height={200}
        className="w-full object-contain"
      />

      <Button
        type="submit"
        onClick={connectWallet}
        className="w-full bg-gray-100/20 text-white hover:bg-white/30"
      >
        Connect to Wallet
      </Button>
    </div>
  );
};

export default ConnectForm;
