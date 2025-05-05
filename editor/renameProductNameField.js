// renameProductNameField.js
const mongoose = require('mongoose');
const Product = require('../models/product.model'); // adjust the path as needed
const { MONGO_URI } = require('./utils/const');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  const result = await Product.updateMany(
    { name: { $exists: true } },
    { $rename: { 'name': 'name_product' } }
  );

  console.log(`Renamed 'name' to 'name_product' in ${result.modifiedCount} product(s).`);
  mongoose.disconnect();
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
