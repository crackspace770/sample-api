const mongoose = require('mongoose');
const Auth = require('../models/auth.model.js'); // update the path if needed
const { MONGO_URI } = require('./utils/const');

// Replace this with your actual MongoDB URI
const mongoUri = MONGO_URI; // change this to your connection string

const addMissingUserIds = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const usersWithoutUserId = await Auth.find({ user_id: { $exists: false } });

    for (const user of usersWithoutUserId) {
      user.user_id = user._id;
      await user.save();
    }

    console.log(`✅ Updated ${usersWithoutUserId.length} users.`);
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error updating users:', err);
    mongoose.connection.close();
  }
};

addMissingUserIds();
