import Image from "next/image";
import { FC, ReactNode, Suspense } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main
      style={{
        backgroundImage: "url('/auth-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full isolate gap-9 px-6 py-9 md:justify-center relative h-full flex flex-col items-center min-h-screen"
    >
      <div className="w-full z-10 flex items-center gap-3 max-w-sm">
        <Image
          alt="logo"
          src="/icon.svg"
          width={300}
          height={300}
          className="size-9 lg:size-10"
        />
        <h1 className="text-3xl lg:text-4xl font-bold text-white">BlockChat</h1>
      </div>

      <Suspense>{children}</Suspense>
    </main>
  );
};

export default AuthLayout;
