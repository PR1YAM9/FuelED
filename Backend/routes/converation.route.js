import express from "express";
const router = express.Router();
import Conversation from "../models/conversation.model.js";
import e from "express";

//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    // Check if a conversation exists between the specified users
    let conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });

    // If conversation doesn't exist, create a new one
    if (!conversation) {
      const newConversation = new Conversation({
        members: [req.params.firstUserId, req.params.secondUserId],
      });
      conversation = await newConversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;