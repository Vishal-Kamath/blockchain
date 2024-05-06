"use client";

import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import ConnectForm from "@/app/(auth)/auth/connect/form";
import { ChatAppContext } from "./chatapp.provider";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(true);
  const { checkIfWalletIsConnected } = useContext(ChatAppContext);

  useEffect(() => {
    if (!!process.browser) {
      checkIfWalletIsConnected().then((connected) => {
        setConnected(!!connected);
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, []);

  if (!connected) {
    return (
      <Dialog open={true}>
        <DialogContent
          className="overflow-hidden outline-none shadow-sky-500/30 bg-slate-950 border-sky-800 sm:rounded-[1.75rem]"
          closeable={false}
        >
          <div className="relative isolate flex flex-col items-center justify-center gap-9 py-6">
            <Image
              alt="auth background image"
              src="/auth-bg.svg"
              width={500}
              height={500}
              className="fixed left-0 top-0 -z-10 h-full w-full object-cover"
            />
            <div className="w-full z-10 flex items-center gap-3 max-w-xs">
              <Image
                alt="logo"
                src="/icon.svg"
                width={300}
                height={300}
                className="size-9 lg:size-10"
              />
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                BlockChat
              </h1>
            </div>
            <ConnectForm />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return children;
};

export default AuthProvider;
