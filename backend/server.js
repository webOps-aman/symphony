const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./utils/db');
const connectCloudinary = require('./utils/cloudinary');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: Not allowed by server"));
      }
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: true,
  })
);





connectCloudinary();

//user routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);




connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on PORT: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    });
