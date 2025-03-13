import cloudinary from "../lib/cloudinary.js"
import User from "../models/user.model.js"
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


export const getUserForSidebar = async (req, res) => {
    try {
        const loggedUserId = req.user._id
        const filterUsers = await User.find({ _id: { $ne: loggedUserId } }).select('-password')
        res.status(200).json(filterUsers)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

//get message user to reciver
export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },  // ✅ Fixed spelling
                { senderId: userToChatId, receiverId: myId }   // ✅ Corrected query
            ]
        }).sort({ createdAt: 1 }); // ✅ Sorted messages by time

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller:", error.message);
        res.status(500).json({ message: "Internal server error" }); // ✅ Proper error handling
    }
};


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({ message: "Message cannot be empty" });
        }

        let imageUrl = "";
        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (error) {
                console.log("Cloudinary upload error:", error.message);
                return res.status(500).json({ message: "Image upload failed" });
            }
        }

        const newMessage = new Message({ // ✅ Use the correct model
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverIdSocketId = getReceiverSocketId(receiverId)
        if(receiverIdSocketId){
            io.to(receiverIdSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in message Sending controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
