import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  attending: { type: Boolean, required: true },
  guests: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('RSVP', rsvpSchema);
