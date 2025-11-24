import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function convertFileToDataUri(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const mime = file.type && file.type.length ? file.type : 'image/jpeg';
  return `data:${mime};base64,${base64}`;
}

export default async function uploadImageAndGetUrl(file: File): Promise<string> {
  console.log(
    "File received for upload:",
    file.name || 'unknown',
    'type:', file.type || 'unknown',
    'size:', file.size ?? 'unknown'
  );

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("Cloudinary environment variables are not set.");
  }

  // 1. Convert File to Data URI
  let dataUri: string;
  try {
    dataUri = await convertFileToDataUri(file);
  } catch (err) {
    console.error('Error converting file to data URI:', err);
    throw new Error('Failed to process the uploaded file.');
  }

  try {
    // 2. Upload the Data URI to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "nextjs-user-profiles",
      resource_type: 'image',
      // Optional: Apply transformations, e.g., square crop and resize
      // transformation: [{ width: 150, height: 150, crop: "fill" }]
    });

    // 3. Return the final public URL
    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload profile picture to cloud storage.");
  }
}