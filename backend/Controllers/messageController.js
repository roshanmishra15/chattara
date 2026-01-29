import mongoose from "mongoose";
import { Conversation } from "../Models/conversationModel.js";
import { Message } from "../Models/messageModel.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;
    const { message } = req.body;

    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderObjectId, receiverObjectId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderObjectId, receiverObjectId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId: senderObjectId,
      receiverId: receiverObjectId,
      message: message.trim(),
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    // 🔥 emit to BOTH users
    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};


/**
 * GET MESSAGES
 */
export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid receiver ID" });
    }

    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    const conversation = await Conversation.findOne({
      participants: { $all: [senderObjectId, receiverObjectId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({
        conversation: { messages: [] },
      });
    }

    return res.status(200).json({
      conversation,
    });
  } catch (error) {
    console.error("GetMessage Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
