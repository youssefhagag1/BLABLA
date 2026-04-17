const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Coupon name is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    expire: {
      type: Date,
      required: [true, 'Coupon expiry date is required'],
    },
    discount: {
      type: Number,
      required: [true, 'Coupon discount is required'],
      min: [0, 'Discount can not be less than 0'],
      max: [100, 'Discount can not be more than 100'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);
