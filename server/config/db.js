const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.ATLAS_URL).then(()=>console.log('DB connected'));
}

module.exports = { connectDB };