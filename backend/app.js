import express from "express";
import user from "./routers/user.js";
import cart from "./routers/cart.js";
import invoice from "./routers/invoice.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import ReservationRouter from "./routers/reservation.js";
import multer from "multer";
import path from "path";

export const app = express();
const storage = multer.diskStorage({
  destination: "./uploads/images", // Destination folder for uploaded images
  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
//var upload = multer({ dest: 'upload/'});

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
app.use('/images', express.static('./uploads/images')); 
app.get("/", (req, res) => {
  res.send("Server is working");
});
// app.post('/api/v1/upload', upload.single('file'), (req, res) => {
//   console.log(req);
//   res.json(req.file);
// })

app.post('/api/v1/upload', upload.single('image'), (req, res) => {
  try {
    if (req.file) {
      console.log(`Uploaded image: ${req.file.filename}`);
      // Handle successful upload (e.g., create image URL)
      const imageUrl = `http://localhost:${process.env.PORT}/images/${req.file.filename}`;
      console.log(imageUrl)
      res.json({ message: "Image uploaded successfully!", image_url: imageUrl });
    } else {
      res.status(400).json({ message: "No image uploaded" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading file" });
  }
});