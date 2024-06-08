import { Reservation } from "../models/reservation.js";
import { Restaurant } from "../models/restaurant.js";
import ReservationService from "../services/reservationService.js";

class ReservationController {
    static CreateReservation = async (req, res) => {
        try {
            const { date, numberOfPersons, startTime, endTime } = req.body;
            if (!date || !numberOfPersons || !startTime || !endTime) {
                return res
                    .status(400)
                    .json({ message: "Bad request. All info is required" });
            }

            if(!req.user._id) {
                return res
                    .status(402)
                    .json({ message: "Unauthorized access." });
            }

            const startTimeDate = new Date(date);
            startTimeDate.setHours(startTime, 0, 0, 0);
            const endTimeDate = new Date(date);
            endTimeDate.setHours(endTime, 0, 0, 0);
            const duration = endTime - startTime;
            const customer = req.user._id;

            const restaurant = await Restaurant.findOne();
            if (!restaurant) {
                return res
                    .status(404)
                    .json({ message: "Restaurant not found." });
            }
            if (!restaurant.isBookingEnabled) {
                return res
                    .status(403)
                    .json({ message: "Bookings are currently disabled." });
            }

            const newReservation = new Reservation({
                customer: customer,
                size: numberOfPersons,
                duration: duration,
                startTime: startTimeDate,
                endTime: endTimeDate,
                specialRequest: "NONE",
            });

            await newReservation.save();
            return res.status(200).json(newReservation);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static GetAvailableHours = async (req, res) => {
        try {
            if (!req.params.date) {
                return res
                    .status(400)
                    .json({ message: "Bad request. Date is required" });
            }
            const restaurantSettings = await Restaurant.findOne();
            if (!restaurantSettings) {
                restaurantSettings = await Restaurant.create({
                    startHour: 10,
                    closeHour: 24,
                    reservationHourInterval: 2,
                    maxCapacity: 100,
                    isBookingEnabled: true,
                });
            }
            if (!restaurantSettings || !restaurantSettings.isBookingEnabled) {
                return res
                    .status(403)
                    .json({ message: "Bookings are currently disabled." });
            }

            const partySize = 12;
            const {
                startHour,
                closeHour,
                reservationHourInterval,
                maxCapacity,
            } = restaurantSettings;
            const availableHours = [];
            for (
                let hour = startHour;
                hour < closeHour;
                hour += reservationHourInterval
            ) {
                availableHours.push(hour);
            }

            const reservationsOnDate =
                await ReservationService.GetReservationsOnDate(req.params.date);

            const finalAvailableHours = availableHours.filter((hour) => {
                const bookedCapacity = reservationsOnDate.reduce(
                    (acc, reservation) => {
                        const reservationHour = new Date(
                            reservation.startTime
                        ).getHours();
                        return reservationHour === hour
                            ? acc + reservation.size
                            : acc;
                    },
                    0
                );
                return bookedCapacity + partySize <= maxCapacity;
            });

            const avHours = [];
            finalAvailableHours.forEach((h) =>
                avHours.push(`${h}:00 - ${h + reservationHourInterval}:00`)
            );
            return res.status(200).json(avHours);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static UpdateReservation = async (req, res) => {
        try {
            //
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static GetReservationById = async (req, res) => {
        try {
            //
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static GetReservationsByCustomer = async (req, res) => {
        try {
            console.log("here")
            const userId = req.user._id;
            if(!userId) {
                return res
                .status(402)
                .json({ message: "Bad request. Unauthorized access." });
            }

            console.log("here");
            const reservation = await Reservation.find({customer: userId});

            return res.status(200).json(reservation);
        } catch (error) {
            return res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static GetReservationsByDate = async (req, res) => {
        try {
            //
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static GetReservationsByStatus = async (req, res) => {
        try {
            //
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static GetReservations = async (req, res) => {
        try {
            const userId = req.user._id;
            if(!userId) {
                return res
                .status(402)
                .json({ message: "Bad request. Unauthorized access." });
            }
            const reservation = await Reservation.find({customer: userId});

            return res.status(200).json(reservation);
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };
}

export default ReservationController;
