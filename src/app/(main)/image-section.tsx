import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

const ChatImageSection: FC<{ images: string[] }> = ({ images }) => {
  const [open, setOpen] = useState(false);

  return !!images.length ? (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex gap-2 cursor-pointer bg-transparent border-none outline-none"
      >
        {images.map((image, index) => (
          <Image
            key={image + index}
            src={image}
            alt="image"
            width={200}
            height={200}
            className={cn(
              "rounded-lg object-contain aspect-square",
              images.length > 1 && "basis-1/2"
            )}
          />
        ))}
      </button>
      {open ? (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-950/50 min-h-screen z-50">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 p-2 right-4 border-2 z-20 rounded-md border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
          >
            <X className="size-6" />
          </button>
          <Carousel>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem className="w-full h-full">
                  <Image
                    src={image}
                    alt="image"
                    width={500}
                    height={500}
                    className="w-full h-full max-h-screen object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 translate-x-0" />
            <CarouselNext className="right-2 translate-x-0" />
          </Carousel>
        </div>
      ) : null}
    </>
  ) : null;
};

export default ChatImageSection;
