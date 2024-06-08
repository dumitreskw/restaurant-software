import mongoose from "mongoose";
const tableSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
})

export default tableSchema;

export const Table = mongoose.model("Table", tableSchema);