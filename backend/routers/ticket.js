import express from "express";
import TicketController from "../controllers/ticket.js";
import { isAuthenticated } from "../middleware/auth.js";

const TicketsRouter = express.Router();
TicketsRouter.route("/ticket").post(
    isAuthenticated,
    TicketController.CreateTicket
);

TicketsRouter.route("/ticket/message").post(
    isAuthenticated,
    TicketController.AddMessage
);

TicketsRouter.route("/ticket/status").post(
    isAuthenticated,
    TicketController.UpdateStatus
);

TicketsRouter.route("/ticket").get(
    isAuthenticated,
    TicketController.GetTickets
);

TicketsRouter.route("/ticket/:id").get(
    isAuthenticated,
    TicketController.GetTicketById
);

export default TicketsRouter;