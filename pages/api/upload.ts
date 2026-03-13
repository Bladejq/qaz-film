import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb"
    }
  }
};

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
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image missing" });
    }

    const upload = await cloudinary.uploader.upload(image, {
      folder: "qazflix",
      resource_type: "image",
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { quality: "auto" }
      ]
    });

    return res.status(200).json({
      url: upload.secure_url
    });

  } catch (error) {

    console.error("Cloudinary upload error:", error);

    return res.status(500).json({
      error: "Upload failed"
    });

  }
}