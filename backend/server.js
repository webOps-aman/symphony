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
app.use(cors());
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
