import express from 'express';
import  mongoose from 'mongoose';
import dotenv from 'dotenv';

import cors from 'cors';
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}


dotenv.config()

import bodyParser from 'body-parser';   // use as a body for post requests
import morgan from 'morgan';  // logs the request along with some other information
import notFoundMiddleware from './middleware/not-found.js';

import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'


const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(morgan('dev'));

// app.use('/v1/user', userRoutes);
// app.use('/v1/order', orderRoutes);
app.use('/v1/product', productRoutes);
app.use('/v1/seller', sellerRoutes);

app.use(notFoundMiddleware)

// Cross Origin middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

const port = 8000;
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(8000, () => {
            console.log(`Server started on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
});