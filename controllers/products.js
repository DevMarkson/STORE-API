const Product = require('../models/Product');

const getAllProductStatic = async (req, res) => {
    const products = await Product.find({ featured: true})
    res.status(200).json({products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const products = await Product.find(req.query)
    res.status(200).json({products, nbHits: products.length })
}

module.exports = {
    getAllProductStatic,
    getAllProducts,
}