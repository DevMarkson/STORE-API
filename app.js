const express = require('express');
require('express-async-errors');

const dotenv = require('dotenv');
const connectDB = require('./database/connect');
const productsRouter = require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// Load config
dotenv.config({ path: './config/config.env' });

const app = express()

// middleware
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>')
})


// routes
app.use('/api/v1/products', productsRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    } catch (error) {
        console.log(error)   
    }
}

start()