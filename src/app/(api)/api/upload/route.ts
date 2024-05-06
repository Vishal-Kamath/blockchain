import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY,
});

async function UploadImage(file: File) {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise(async (resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(bytes);
  });
}
export async function POST(request: Request) {
  const formData = await request.formData();
  const images = formData.getAll("images") as File[];
  try {
    const newImages: string[] = [];
    for (const image of images) {
      const response = (await UploadImage(image)) as any;
      response?.secure_url && newImages.push(response.secure_url);
    }

    return NextResponse.json({ images: newImages });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ failed: "vev" }); // Re-throw the error for handling in the calling function
  }
}
