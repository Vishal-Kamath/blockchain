"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ImageUp, Paperclip, Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

const AddFilesForm: FC<{
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;

  imagesFiles: File[];
  setImagesFiles: Dispatch<SetStateAction<File[]>>;
}> = ({ images, setImages, imagesFiles, setImagesFiles }) => {
  async function AddFiles(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files as File[] | null;
    if (!selectedFiles || !selectedFiles.length) {
      alert("Please select some images to upload!");
      return;
    }

    const urls = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setImagesFiles([...imagesFiles, ...selectedFiles]);
    setImages([...images, ...urls]);
  }

  function deleteImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    const newImagesFiles = imagesFiles.filter((_, i) => i !== index);
    setImages(newImages);
    setImagesFiles(newImagesFiles);
  }

  function clearImages() {
    setImages([]);
    setImagesFiles([]);
  }

  return (
    <Dialog>
      <DialogTrigger className="size-5 flex-shrink-0 flex justify-center items-center text-gray-400 relative hover:text-white">
        {images.length > 0 ? (
          <div className="top-0 left-0 absolute text-xs rounded-full px-1 text-slate-900 bg-sky-400 -translate-y-1/2 -translate-x-1/2">
            {images.length}
          </div>
        ) : null}
        <Paperclip className="size-5" />
      </DialogTrigger>
      <DialogContent
        closeable
        className="bg-slate-950 flex flex-col gap-9 text-white border-slate-800 border-2"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-medium">Add Images</h3>
          <p className="text-xs text-gray-400">
            currently {images.length} have been added.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            direction: "ltr",
            dragFree: true,
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="relative cursor-grab active:cursor-grabbing basis-1/2"
              >
                <button
                  onClick={() => deleteImage(index)}
                  className="absolute top-2 right-2 size-7 flex justify-center items-center bg-red-500/30 rounded-md"
                >
                  <Trash2 className="size-5 text-red-500" />
                </button>
                <Image
                  src={image}
                  alt="uploaded image"
                  width={500}
                  height={500}
                  className="w-full h-full bg-slate-900 object-contain rounded-xl"
                />
              </CarouselItem>
            ))}
            <CarouselItem className="relative basis-1/2">
              <input
                type="file"
                multiple
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={AddFiles}
              />
              <div className="w-full bg-slate-900 border-4 border-dashed flex flex-col gap-1 items-center justify-center border-gray-800 h-full rounded-xl aspect-square">
                <ImageUp className="size-20 text-gray-600" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>

        <div className="flex gap-3">
          <Button
            variant="link"
            onClick={clearImages}
            className="text-gray-400 p-0 hover:text-red-500"
          >
            Clear all Images
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFilesForm;
