import { connect } from '../../lib/db';
import Image from '../../lib/models/Image';
import { uploadImage } from '../../lib/cloudinary';
import { verifyToken } from '../../lib/middleware/auth';
import { Buffer } from 'buffer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    await connect();
    
    const { image, recipientId, sender, message } = req.body;
    
    if (!image || !recipientId) {
      return res.status(400).json({ message: 'Image and recipient ID are required' });
    }
    
    // Process base64 image
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    const file = {
      buffer,
      mimetype: image.split(';')[0].split(':')[1]
    };
    
    // Upload to Cloudinary
    const { url, cloudinaryId } = await uploadImage(file);
    
    // Create new image record
    const newImage = new Image({
      url,
      cloudinaryId,
      recipientId,
      sender: sender || 'Anonymous',
      message: message || ''
    });
    
    await newImage.save();
    
    res.status(201).json({
      id: newImage._id,
      url: newImage.url,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}