import { Invoice } from "../models/invoice.js";
import { Reservation } from "../models/reservation.js";
import { Restaurant } from "../models/restaurant.js";
import { Ticket } from "../models/ticket.js";
import { User } from "../models/users.js";
import ReservationService from "../services/reservationService.js";

class StatisticsController {
    static GetStatistics = async (req, res) => {
        try {
            const totalNumberOfUsers = await User.countDocuments();
            const totalNumberOfReservations =
                await Reservation.countDocuments();
            const totalNumberOfTickets = await Ticket.countDocuments();
            const totalNumberOfOrders = await Invoice.countDocuments();

            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setMonth(startDate.getMonth() - 6);

            const reservationsByMonth = await Reservation.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startDate, $lte: endDate },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m",
                                date: "$createdAt",
                            },
                        },
                        numReservations: { $sum: 1 },
                    },
                },
                {
                    $sort: { _id: -1 },
                },
            ]);

            const invoicesByMonth = await Invoice.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startDate, $lte: endDate },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m",
                                date: "$createdAt",
                            },
                        },
                        numInvoices: { $sum: 1 },
                    },
                },
                {
                    $sort: { _id: -1 },
                },
            ]);

            const totalRevenue = await Invoice.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: "$totalPrice" },
                    },
                },
            ]);

            const revenuesByMonth = await Invoice.aggregate([
                {
                  $match: {
                    createdAt: { $gte: startDate, $lt: endDate }, // Filtrează facturile din ultimele 6 luni
                  },
                },
                {
                  $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$createdAt",
                        },
                    },
                    totalEarnings: { $sum: "$totalPrice" },
                  },
                },
              ]);

            let invoiceChart = {
                labels: invoicesByMonth.map(c => c._id),
                values: invoicesByMonth.map(c => c.numInvoices)
            }

            fillMissingMonths(invoiceChart);

            const revenueChart = {
                labels: revenuesByMonth.map(c => c._id),
                values: revenuesByMonth.map(c => c.totalEarnings)
            }

            const reservationsChart = {
                labels: reservationsByMonth.map(c => c._id),
                values: reservationsByMonth.map(c => c.numReservations)
            }

            const statisticsObj = {
                totalNumberOfUsers: totalNumberOfUsers,
                totalNumberOfReservations: totalNumberOfReservations,
                totalNumberOfTickets: totalNumberOfTickets,
                totalNumberOfOrders: totalNumberOfOrders,
                totalRevenue: totalRevenue[0].totalAmount,
                reservationsByMonth: reservationsChart,
                invoicesByMonth: invoiceChart,
                revenuesByMonth: revenueChart,
            };
            return res.status(200).json(statisticsObj);
            //
        } catch (error) {
            res.status(500).json({
                message: "Server error. Please try again later",
            });
        }
    };


}

function fillMissingMonths(data) {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 5); // 6 luni în urmă (inclusiv luna curentă)
  
    const allMonths = [];
    const allValues = {};
  
    for (let d = new Date(sixMonthsAgo); d <= today; d.setMonth(d.getMonth() + 1)) {
      const yearMonth = d.toISOString().slice(0, 7); // Formatează ca "YYYY-MM"
      allMonths.push(yearMonth);
      allValues[yearMonth] = 0; // Inițializează cu 0
    }
  
    // Actualizează valorile existente
    data.labels.forEach((label, index) => {
      allValues[label] = data.values[index];
    });
  
    return {
      labels: allMonths,
      values: allMonths.map(month => allValues[month])
    };
  }

export default StatisticsController;
