import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image missing" });
    }

    const upload = await cloudinary.uploader.upload(image, {
      folder: "qazflix",
      resource_type: "image"
    });

    return res.status(200).json({
      url: upload.secure_url
    });

  } catch (error) {

    console.log("UPLOAD ERROR:", error);

    return res.status(500).json({
      error: "Upload failed"
    });

  }
}