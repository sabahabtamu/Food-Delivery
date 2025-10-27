const express = require("express");
const { addFood, getFoodImage, listFood, removeFood } = require("../controllers/foodController.js");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage"); 
const path = require("path");
require("dotenv").config();

const foodRouter = express.Router();

// Correct GridFS Storage Engine
const storage = new GridFsStorage({
  url: process.env.ATLAS_URL,
  file: (req, file) => {
    // This promise is handled automatically
    const filename = `${Date.now()}${path.extname(file.originalname)}`;
    return Promise.resolve({
      filename: filename,
      bucketName: "uploads",
    });
  },
});

const upload = multer({ storage });

// Route to upload a single file
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/image/:filename", getFoodImage);
foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)

module.exports = foodRouter;