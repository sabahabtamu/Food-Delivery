const foodModel = require('../models/foodModel.js');
const fs = require('fs');
const mongoose = require('mongoose');

const addFood = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({success: false, message: 'No image file uploaded'});
        }

        // Check if required fields are provided
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
            return res.status(400).json({success: false, message: 'Missing required fields'});
        }

        let image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({success: true, message: 'Food Added', filename: image_filename});
    } catch (error) {
        console.log('Error adding food:', error);
        res.status(500).json({success: false, message: 'Error adding food item'});
    }
}

const getFoodImage = async (req, res) => {
    try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads" // Must match your storage bucketName
        });

        // Find the file by its filename
        const file = await bucket.find({ filename: req.params.filename }).next();

        if (!file) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        // Set Content-Type header so the browser knows how to display the image
        res.set('Content-Type', file.contentType);

        // Open a download stream from GridFS and pipe it to the response
        const readStream = bucket.openDownloadStreamByName(req.params.filename);
        readStream.pipe(res);
    } catch (error) {
        console.error('Error retrieving food image:', error);
        res.status(500).json({ success: false, message: 'Error retrieving image' });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods})
    } catch {
        console.log(error);
        res.json({ success: false, message: 'Error'})
    }
}

const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        // console.log(food)
        if (!food) {
            return res.json({ success: false, message: 'Food item not found' });
        }

        const filename = food.image;

        // Create a GridFS bucket instance
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads"
        });
        
        // Find the image file in GridFS by filename
        const imageFile = await bucket.find({ filename: filename }).next();
        // console.log(imageFile)

        if (imageFile) {
            // Delete the image file from GridFS using its _id
            await bucket.delete(imageFile._id);
        }

        // Delete the food document from the collection
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: 'Food removed' });
    } catch (error) {
        console.error('Error removing food:', error);
        res.json({ success: false, message: 'Error removing food item' });
    }
}

module.exports = { addFood, getFoodImage, listFood, removeFood };