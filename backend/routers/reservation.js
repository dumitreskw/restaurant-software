import express from "express";
import ReservationController from "../controllers/reservation.js";
import { isAuthenticated } from "../middleware/auth.js";

const ReservationRouter = express.Router();
ReservationRouter.route("/reservations/date/:date").get(
    ReservationController.GetAvailableHours
);
ReservationRouter.route("/reservations").get(
    isAuthenticated,
    ReservationController.GetReservations
);
ReservationRouter.route("/reservations/:id").get(
    ReservationController.GetReservationById
);
ReservationRouter.route("/reservations/byUser").get(
    isAuthenticated,
    ReservationController.GetReservationsByCustomer
);
ReservationRouter.route("/reservations/status/:status").get(
    ReservationController.GetReservationsByStatus
);

ReservationRouter.route("/reservations").post(
    isAuthenticated,
    ReservationController.CreateReservation
);

ReservationRouter.route("/reservations/:id").put(
    ReservationController.UpdateReservation
);

export default ReservationRouter;
