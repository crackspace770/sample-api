// deleteProductsWithoutUserId.js
const mongoose = require('mongoose');
const Product = require('../models/product.model.js'); // adjust path as needed

mongoose.connect('mongodb+srv://crackspace990:mU76h8mtl8jG3fX5@backenddb.boqeb.mongodb.net/Node_API?retryWrites=true&w=majority&appName=BackendDB', {
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
