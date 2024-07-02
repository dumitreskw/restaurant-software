import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    userName: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    sentAt: { type: Date, default: Date.now },
});

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    messages: [messageSchema],
    status: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    priority: { 
        type: String, 
        enum: ["low", "medium", "high"], 
        default: "medium" 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
export default ticketSchema;
ticketSchema.pre("save", function(next) {
    this.updatedAt = new Date();
    next();
  });
export const Ticket = mongoose.model("Ticket", ticketSchema);