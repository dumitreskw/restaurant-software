import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getProductsNames } from "../controllers/product.js";


const menuRouter = express.Router();
menuRouter.route("/product-names").post(isAuthenticated, getProductsNames);

export default menuRouter;