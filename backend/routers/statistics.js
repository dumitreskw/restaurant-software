import express from "express";
import StatisticsController from "../controllers/statistics.js";

const StatisticsRouter = express.Router();
StatisticsRouter.route("/statistics").get(
    StatisticsController.GetStatistics
);

export default StatisticsRouter;