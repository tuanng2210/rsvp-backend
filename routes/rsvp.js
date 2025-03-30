import express from 'express';
import RSVP from '../models/RSVP.js';

const router = express.Router();

// POST: Submit RSVP
router.post('/', async (req, res) => {
  try {
    const newRSVP = new RSVP(req.body);
    await newRSVP.save();
    res.status(201).json({ message: 'RSVP received' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ NEW: GET all RSVPs
router.get('/', async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(rsvps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch RSVPs' });
  }
});

export default router;
