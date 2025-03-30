import express from "express";
import RSVP from "../models/RSVP.js";

const router = express.Router();
import { parse } from 'json2csv';


// POST: Submit RSVP
router.post("/", async (req, res) => {
  try {
    const newRSVP = new RSVP(req.body);
    await newRSVP.save();
    res.status(201).json({ message: "RSVP received" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ NEW: GET all RSVPs
router.get("/", async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(rsvps);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch RSVPs" });
  }
});

// Route to download CSV
router.get("/download-csv", async (req, res) => {
  try {
    const rsvps = await RSVP.find(); // Fetch all RSVPs from the database

    // Prepare CSV data using json2csv
    const csv = parse(
      rsvps.map((rsvp) => ({
        name: rsvp.name,
        attending: rsvp.attending ? "Yes" : "No",
        guests: rsvp.guests,
        createdAt: new Date(rsvp.createdAt).toLocaleString(),
      }))
    );

    // Set response headers to indicate a file download
    res.header("Content-Type", "text/csv");
    res.attachment("rsvps.csv");
    res.send(csv); // Send the CSV content as a response
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).send("Server Error");
  }
});

export default router;
