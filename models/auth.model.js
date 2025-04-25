const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
    },
    name: {
        type: String,
        required: [true, 'Name is required']},
    email: {
        type: String,
        required: [true, 'Email is required'], unique: true},
    password: {
        type: String,
        required: [true, 'Password is required'], select: false},
    }
);

AuthSchema.pre('save', function (next) {
    if (!this.user_id) {
      this.user_id = this._id;
    }
    next();
  });

const Auth = mongoose.model('Auth', AuthSchema);
module.exports = Auth;