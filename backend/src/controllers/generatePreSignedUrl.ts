
import { getPresignedUrl } from "../utils/getPresignedUrl"; // adjust path
import { Request, Response } from "express";

export const generatePresignedUrl = async (req:Request,res:Response):Promise<any> => {
  try {
    const { key } = req.query;

    if (!key || typeof key !== "string") {
      return res.status(400).json({ success: false, message: "Missing image key" });
    }

    const url = await getPresignedUrl(key);
    console.log('generatePresignedurl',url)
    res.status(200).json({ success: true, url });
  } catch (error) {
    console.error("Presigned URL error:", error);
    res.status(500).json({ success: false, message: "Could not generate signed URL" });
  }
};
