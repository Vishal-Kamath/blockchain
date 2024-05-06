import Header from "@/components/header/header";
import { FC, ReactNode } from "react";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: "url('chat-bg.svg')",
        backgroundSize: "cover",
      }}
      className="w-full h-full min-h-screen bg-slate-950 flex-col flex"
    >
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
