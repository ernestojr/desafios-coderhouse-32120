import mongoose, { Schema } from 'mongoose'

const user = new Schema({
  firstname: {
    type: String,
    required: function () {
      return !this.twitter_id;
    },
  },
  lastname: {
    type: String,
    required: function () {
      return !this.twitter_id;
    },
  },
  twitter_id: {
    type: String,
    unique: true
  },
  age: {
    type: Number,
    required: function () {
      return !this.twitter_id;
    },
  },
  phone: {
    type: String,
    required: function () {
      return !this.twitter_id;
    },
  },
  email: {
    type: String,
    required: function () {
      return !this.twitter_id;
    },
    unique: true,
    index: true,
    validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive'],
  },
}, { timestamps: true })

export default mongoose.model('User', user)
