import express from "express";
import user from "./routers/user.js";
import cart from "./routers/cart.js";
import invoice from "./routers/invoice.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import ReservationRouter from "./routers/reservation.js";

export const app = express();

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'https://localhost',
  'http://localhost:8080',
  'http://localhost:4200',
  'http://localhost:8100',
  'http://localhost:51400',
  
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is included in the allowedOrigins array
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", user);
app.use("/api/v1/cart", cart);
app.use("/api/v1/invoice", invoice);
app.use("/api/v1", ReservationRouter)
app.get("/", (req, res) => {
  res.send("Server is working");
});
