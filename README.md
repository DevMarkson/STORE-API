# Store API Documentation

Welcome to the Store API Documentation. This guide outlines the endpoints, functionalities, and setup instructions for the Node.js-based Store API, which interacts with a MongoDB database to manage and retrieve product information.

## Table of Contents
- [Introduction](#introduction)
- [Database Schema](#database-schema)
- [JSON Data Population](#json-data-population)
- [Endpoints and Examples](#endpoints-and-examples)
  - [Get All Products](#get-all-products)
  - [Get All Products (Static)](#get-all-products-static)

## Introduction

The Store API is designed to facilitate the management and retrieval of product information for a store. This API allows you to access various product details, including names, prices, ratings, and company associations. It offers two primary endpoints: one for dynamic queries and another for fetching a static list of products. The API is built using Node.js, MongoDB for data storage, and Express for routing.

## Database Schema

The MongoDB database schema is structured as follows:

```javascript
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name must be provided']
  },
  price: {
    type: Number,
    required: [true, 'Product price must be provided']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported'
    }
  }
});

module.exports = mongoose.model('Product', ProductSchema);
```

## JSON Data Population

The provided JSON file (`products.json`) is used to populate the database with initial product data. The script in `populate.js` connects to the database and inserts the products.

## Endpoints

### Get All Products

This endpoint allows for dynamic querying of products based on various parameters.

**URL:** `/api/v1/products`
**Method:** `GET`

**Query Parameters:**

- `featured`: Filter by featured products.
- `company`: Filter by company.
- `name`: Search for products by name.
- `sort`: Sort the products (comma-separated field names).
- `fields`: Select specific fields to include in the response.
- `numericFilters`: Apply numeric filtering conditions (e.g., '>100').

#### Response

The response will contain the following fields:

- `products`: An array of product objects based on the query.
- `nbHits`: The count of products in the response.

**Pagination:**

- The `page` parameter controls the page number of the results (default: 1).
- The `limit` parameter controls the number of products per page (default: 10).

#### Examples

**Request:**
```http
GET localhost:3000/api/v1/products?featured=true&company=ikea&sort=price&fields=name,price
```

```json
{
  "products": [
    {
      "name": "albany sectional",
      "price": 109,
      "rating": 5
    },
    {
      "name": "albany table",
      "price": 309,
      "rating": 4.9
    },
    {
      "name": "bar stool",
      "price": 40,
      "rating": 4.6
    },
    {
      "name": "modern poster",
      "price": 30
    },
    {
      "name": "simple chair",
      "price": 109
    },
    {
      "name": "utopia sofa",
      "price": 79
    }
  ],
  "nbHits": 6
}
```

### Get All Products (Static)

This endpoint returns a static list of products from the database.

**URL:** `/api/products/static`
**Method:** `GET`

#### Response

The response will contain the following fields:

- `products`: An array of product objects containing 'name' and 'price' fields.
- `nbHits`: The count of products in the response.

#### Examples

**Request:**

```http
GET localhost:3000/api/products/static
```

**Response:**
```json
{
  "products": [
    {
      "name": "accent chair",
      "price": 25,
      "company": "marcos",
      "rating": 4
    },
    {
      "name": "albany sectional",
      "price": 109,
      "company": "liddy",
      "rating": 5
    },
    {
      "name": "albany table",
      "price": 309,
      "company": "liddy",
      "rating": 4.9
    },
    {
      "name": "armchair",
      "price": 125,
      "company": "marcos",
      "rating": 4.8
    },
    {
      "name": "bar stool",
      "price": 40,
      "company": "liddy",
      "rating": 4.6
    },
    {
      "name": "dining table",
      "price": 42,
      "company": "ikea",
      "rating": 4.55
    },
    // ... more products
  ],
  "nbHits": 20
}
```
Thank you for taking the time to dive into the Store API Documentation! I truly hope this guide has been helpful in providing insights into the endpoints, functionalities, and setup process for our Node.js-based Store API. If you ever have questions, feedback, or new ideas that stem from your own implementation, please don't hesitate to get in touch. As you continue crafting your unique applications using the API, remember that your creativity knows no bounds.

With sincere gratitude,
[Favour Markson](https://twitter.com/MarksonFavour1)