import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FC } from "react";

const AuthInput: FC<InputProps> = ({ className, ...props }) => {
  return (
    <Input
      className={cn(
        "border-gray-600 bg-gray-700/50 focus-visible:ring-white/50",
        className,
      )}
      {...props}
    />
  );
};

export default AuthInput;
