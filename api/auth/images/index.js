import { connect } from '../../lib/db';
import Image from '../../lib/models/Image';
import { verifyToken } from '../../lib/middleware/auth';

export default async function handler(req, res) {
  // Handle GET request - get user's images
  if (req.method === 'GET') {
    try {
      await connect();
      
      // Get token from header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
      
      // Verify token
      const decoded = verifyToken(token);
      
      // Get user's images
      const images = await Image.find({ recipientId: decoded.id }).sort({ dateUploaded: -1 });
      
      return res.status(200).json(images);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}