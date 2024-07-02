import { Ticket } from "../models/ticket.js";

class TicketController {
    static CreateTicket = async (req, res) => {
        try {
            const userId = req.user._id;
            const { title, message } = req.body;
            if (!title || !message) {
                return res
                    .status(400)
                    .json({ message: "Bad request. Try again later." });
            }

            if (!userId) {
                return res
                    .status(402)
                    .json({ message: "Unauthorized access." });
            }
            const messageObj = {
                user: userId,
                text: message,
                sentAt: new Date(),
                userName: req.user.name
            }
            const newTicket = new Ticket({
                owner: userId,
                title: title,
                messages: []
            })

            newTicket.messages.push(messageObj);
            
            await newTicket.save();
            return res.status(200).json(newTicket);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static AddMessage = async (req, res) => {
        try {
            const userId = req.user._id;
            const { ticketId, message } = req.body;
            if (!ticketId || !message) {
                return res
                    .status(400)
                    .json({ message: "Bad request. Try again later." });
            }

            if (!userId) {
                return res
                    .status(402)
                    .json({ message: "Unauthorized access." });
            }

            const userName = req.user.role == "ADMIN" ? "Admin" : req.user.name
            const messageObj = {
                user: userId,
                text: message,
                sentAt: new Date(),
                userName: userName
            }

            let ticket = await Ticket.findById(ticketId);
            if(!ticket) {
                return res
                    .status(400)
                    .json({ message: "Bad request. Try again later." });
            }

            ticket.messages.push(messageObj);
            await ticket.save();

            return res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    }

    static UpdateStatus = async (req, res) => {
        try {
            const {ticketId, status} = req.body;
            if (!ticketId) {
                return res
                    .status(404)
                    .json({ message: "Bad request. Ticket not found." });
            }

            let ticket = await Ticket.findById(ticketId);
            if(!ticket) {
                return res
                    .status(404)
                    .json({ message: "Bad request. Ticket not found." });
            }

            ticket.status = status;
            await ticket.save();

            return res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static GetTickets = async (req, res) => {
        try {
            const userId = req.user._id;
            if (!userId) {
                return res
                    .status(402)
                    .json({ message: "Bad request. Unauthorized access." });
            }

            if(req.user.role == "ADMIN") {
                const tickets = await Ticket.find();
                return res.status(200).json(tickets);
            }
            else {
                const userTickets = await Ticket.find({owner: userId})
                return res.status(200).json(userTickets);
            }
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };

    static GetTicketById = async (req, res) => {
        try {
            const {ticketId} = req.body;

            if (!ticketId) {
                return res
                    .status(404)
                    .json({ message: "Bad request. Ticket not found." });
            }

            const ticket = await Ticket.findOne({_id: ticketId});
            return res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };
}

export default TicketController;
