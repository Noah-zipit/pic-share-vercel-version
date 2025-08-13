import { connect } from '../../../lib/db';
import Image from '../../../lib/models/Image';
import { deleteImage } from '../../../lib/cloudinary';
import { verifyToken } from '../../../lib/middleware/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  
  await connect();
  
  // GET - get single image
  if (req.method === 'GET') {
    try {
      const image = await Image.findById(id);
      
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      
      return res.status(200).json(image);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  
  // DELETE - delete image
  if (req.method === 'DELETE') {
    try {
      // Get token from header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
      
      // Verify token
      const decoded = verifyToken(token);
      
      // Find image
      const image = await Image.findById(id);
      
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      
      // Check user owns the image
      if (image.recipientId.toString() !== decoded.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      
      // Delete from Cloudinary
      await deleteImage(image.cloudinaryId);
      
      // Delete from database
      await Image.findByIdAndDelete(id);
      
      return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}