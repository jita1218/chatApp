import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    message:{
        type:String,
        required:true,
    }
    //createdAt and updatedAt fields are automatically added by mongoose
},{
    timestamps:true
});

const Message = mongoose.model("Message", messageSchema);

export default Message;