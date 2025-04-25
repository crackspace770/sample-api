const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },  
    name_product: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    image: {
        type: String,
        required: [false]
    },
   
},
{timestamps: true}

);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;