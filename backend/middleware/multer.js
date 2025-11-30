const multer = require("multer");
const path = require("path");

// Upload Folder Path
const uploadPath = path.join(__dirname, "../uploads");

// Multer Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Uploads folder
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

// Filter (optional)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, PNG, and WEBP allowed"), false);
    }
};

module.exports = multer({
    storage,
    fileFilter
});
