import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    default: 'Anonymous'
  },
  message: {
    type: String,
    default: ''
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateUploaded: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);