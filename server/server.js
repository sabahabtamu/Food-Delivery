const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db.js');
const foodRouter = require('./routes/foodRoute.js');
const userRouter = require('./routes/userRoute.js');
const dotenv = require('dotenv');
const cartRouter = require('./routes/cartRoute.js');
const orderRouter = require('./routes/orderRoute.js');


dotenv.config();


// app config
const app = express();
const port = process.env.PORT || 4000;
;
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('API working')
});

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
});
