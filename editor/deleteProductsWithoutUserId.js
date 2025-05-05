// deleteProductsWithoutUserId.js
const mongoose = require('mongoose');
const Product = require('../models/product.model.js'); // adjust path as needed
const { MONGO_URI } = require('./utils/const');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  const result = await Product.deleteMany({ user_id: { $exists: false } });
  console.log(`Deleted ${result.deletedCount} product(s) without user_id.`);

  mongoose.disconnect();
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
