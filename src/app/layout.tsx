import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatAppProvider from "@/components/providers/chatapp.provider";
import AuthProvider from "@/components/providers/auth.provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlockChat",
  description: "The decentralized chat application.",

  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/favicon/favicon-180x180.png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        color: "#000000",
        url: "/favicon/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "BlockChat",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          " bg-slate-950 min-h-screen h-full w-full"
        )}
      >
        <ChatAppProvider>
          <AuthProvider>{children}</AuthProvider>
        </ChatAppProvider>
      </body>
    </html>
  );
}
