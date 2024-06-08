import { Reservation } from "../models/reservation.js";

class ReservationService {
    static GetReservationsOnDate = async (date) => {
        try{
            const inputDate = new Date(date);
            const startDate = new Date(inputDate);
            const endDate = new Date(inputDate);

            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            const reservationsOnDate = await Reservation.find({
                startTime: { $gte: startDate, $lte: endDate }
            });

            return reservationsOnDate;
        }
        catch(error) {
            throw new Error("Server error");
        }
    }
}

export default ReservationService;