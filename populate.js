const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' });


const connectDB = require('./database/connect');
const Product = require('./models/Product');

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Success!!!!')
        process.exit(0)
    } catch (error) {
        console.log(error)   
        process.exit(1)
    }
}

start()