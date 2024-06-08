import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    tables: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table'
        }
    ],
    size: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    specialRequest: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: "PENDING"
    }
})

export default reservationSchema;
export const Reservation = mongoose.model("Reservation", reservationSchema);