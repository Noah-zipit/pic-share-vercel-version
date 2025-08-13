import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadImage(file) {
  // Convert buffer to base64
  const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'pic-share',
    });
    
    return {
      url: uploadResponse.secure_url,
      cloudinaryId: uploadResponse.public_id
    };
  } catch (err) {
    console.error(err);
    throw new Error('Error uploading to Cloudinary');
  }
}

export async function deleteImage(cloudinaryId) {
  try {
    await cloudinary.uploader.destroy(cloudinaryId);
    return { success: true };
  } catch (err) {
    console.error(err);
    throw new Error('Error deleting from Cloudinary');
  }
}