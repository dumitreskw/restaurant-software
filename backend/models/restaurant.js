import mongoose from "mongoose";
const restaurantSchema = new mongoose.Schema({
    startHour: {
        type: Number,
        required: true
    },
    closeHour: {
        type: Number,
        required: true
    },
    reservationHourInterval: {
        type: Number,
        default: 2
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    isBookingEnabled: {
        type: Boolean,
        default: true
    }
})

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);

