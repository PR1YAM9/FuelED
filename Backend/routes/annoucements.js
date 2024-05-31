// routes/announcement.js
import express from "express";
import Announcement from "../models/annoucements.model.js";
import { verifyHost } from "../utils/verifyUser.js";
const router = express.Router();

// Route to create an announcement
router.post("/:eventId", async (req, res) => {
    const eventId = req.params.eventId;
  const newAnnouncement = new Announcement({
    eventId: eventId,
    text: req.body.text,
    createdBy: req.body.user,
  });

  try {
    const savedAnnouncement = await newAnnouncement.save();
    res.status(200).json(savedAnnouncement);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get announcements for an event
router.get("/:eventId", async (req, res) => {
  try {
    const announcements = await Announcement.find({
      eventId: req.params.eventId,
    }).populate("createdBy", "username");
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
