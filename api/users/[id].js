import { connect } from '../../../lib/db';
import User from '../../../lib/models/User';
import { verifyToken } from '../../../lib/middleware/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  
  await connect();
  
  // GET - get user profile
  if (req.method === 'GET') {
    try {
      // Find user by ID but don't return password
      const user = await User.findById(id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}